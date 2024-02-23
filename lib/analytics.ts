
import prisma from "@/lib/db";


type AnalyticsArgs = {
    os?: string,
    browser?: string,
    device?: string,
    location?: string,
    siteId?: string,
    blogId?: string,
    path: string
}


type getAnalyticsArgs = {
    type: "allsites" | "allblogs" | "site" | "blog",
    siteId?: string,
    blogId?: string,
    userId?: string,
    nDays: number | 30
}

export const TrackAnalytics = async (namespace: "sites" | "blog" | "other", event: AnalyticsArgs) => {

    try {
        const response = await prisma.analytics.create({
            data: {
                type: namespace,
                os: event.os,
                browser: event.browser,
                device: event.device,
                location: event.location,
                path: event.path,
                siteId: event.siteId || null,
                blogId: event.blogId || null,
            }
        })
        if (event.siteId) {
            await prisma.site.update({
                where: {
                    id: event.siteId
                },
                data: {
                    totalviews: {
                        increment: 1
                    }
                }
            })
        }

        if (event.blogId) {
            await prisma.blog.update({
                where: {
                    id: event.blogId
                },
                data: {
                    totalviews: {
                        increment: 1
                    }
                }
            })
        }
        return response
    } catch (error) {
        console.log(error)
    }
}


export const getSitesAnalytics = async (siteid: string, nDays: number): Promise<{
    analytics: {
        date: string,
        views: number
    }[],
    totalviews: number,
    weekviews: number,
    avgviews: number,
    weekavgviews: number,
    monthviews: number,
    monthavgviews: number
}> => {
    try {
        const response = await prisma.analytics.findMany({
            where: {
                type: "sites",
                siteId: siteid,
                created_at: {
                    gte: new Date(new Date().setDate(new Date().getDate() - nDays))
                },
            },
            orderBy: {
                created_at: "asc"
            }
        })

        let data: { date: string, views: number }[] = []








        for (let i = nDays - 1; i > 1; i--) {
            let date = new Date(new Date().setDate(new Date().getDate() - i)).toLocaleDateString()
            let index = data.findIndex(d => d.date === date)
            if (index === -1) {
                data.push({ date, views: 0 })
            }
        }
        response.reduce((acc: { date: string, views: number }[], curr) => {
            let date = new Date(curr.created_at).toLocaleDateString()

            let index = acc.findIndex(d => d.date === date)
            if (index !== -1) {
                acc[index].views += 1
            } else {
                acc.push({ date, views: 1 })
            }
            return acc
        }, data)

        let totalviews = 0
        let weekviews = 0
        let monthviews = 0
        let weekavgviews = 0
        let monthavgviews = 0
        let avgviews = 0
        let week = 0
        let month = 0

        data.forEach(d => {
            totalviews += d.views
            if (week < 7) {
                weekviews = weekviews + d.views
            }
            if (month < 30) {
                monthviews += d.views
                month += 1
            }
        })
        const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
        avgviews = totalviews / data.length;

        weekavgviews = parseFloat((weekviews / 7).toFixed(2));
        monthavgviews = parseFloat((monthviews / daysInMonth).toFixed(2));
        return { analytics: data, totalviews, weekviews, avgviews, weekavgviews, monthviews, monthavgviews }


        // return data;
    } catch (error) {
        console.log(error)
        return {
            analytics: [],
            totalviews: 0,
            weekviews: 0,
            avgviews: 0,
            weekavgviews: 0,
            monthviews: 0,
            monthavgviews: 0
        }
    }
}



export const getSiteBlogAnalytics = async (siteid: string) => {


    try {

        // get all the blogs of with that siteid
        let blogs = await prisma.blog.findMany({
            where: {
                siteId: siteid,
                published: true
            },
            orderBy: {
                totalviews: "desc"
            }
        })


        let data: { name: string, value: number }[] = []

        blogs.forEach(blog => {
            data.push({ name: blog.title || blog.slug, value: blog.totalviews })
        })


        return data;

    } catch (error) {
        console.log(error)

        return [{ name: "No Blogs", value: 0 }]
    }
}


export const getBlogsAnalytics = async (blogid: string, nDays: number): Promise<{
    analytics: {
        date: string,
        hits: string
    }[],
    totalviews: number,
    weekviews: number,
    avgviews: number,
    weekavgviews: number,
    monthviews: number,
    monthavgviews: number
}> => {
    try {
        const response = await prisma.analytics.findMany({
            where: {
                type: "blog",
                blogId: blogid,
                created_at: {
                    gte: new Date(new Date().setDate(new Date().getDate() - nDays))
                },
            },
            orderBy: {
                created_at: "desc"
            }
        })


        let data: { date: string, hits: number }[] = []
        response.reduce((acc: { date: string, hits: number }[], curr) => {
            let date = new Date(curr.created_at).toLocaleDateString()
            let index = acc.findIndex(d => d.date === date)
            if (index !== -1) {
                acc[index].hits += 1
            } else {
                acc.push({ date, hits: 1 })
            }
            return acc
        }, data)

        // convert hits from number to strings

        let newdata = data.map(d => {
            return {
                date: d.date,
                hits: d.hits.toString()
            }
        })

        let totalviews = 0
        let weekviews = 0
        let monthviews = 0
        let weekavgviews = 0
        let monthavgviews = 0
        let avgviews = 0
        let week = 0
        let month = 0
        data.forEach(d => {
            totalviews += d.hits
            if (week < 7) {
                weekviews += d.hits
                week += 1
            }
            if (month < 30) {
                monthviews += d.hits
                month += 1
            }
        })
        const daysInMonth = new Date(new Date().getFullYear(), new Date().
            getMonth() + 1, 0).getDate()
        avgviews = totalviews / data.length
        weekavgviews = weekviews / 7
        monthavgviews = monthviews / daysInMonth


        return { analytics: newdata, totalviews, weekviews, avgviews, weekavgviews, monthviews, monthavgviews }

    } catch (error) {
        console.log(error)
        return {
            analytics: [],
            totalviews: 0,
            weekviews: 0,
            avgviews: 0,
            weekavgviews: 0,
            monthviews: 0,
            monthavgviews: 0
        }
    }
}



export const getAnalytics = async (namespace: "sites" | "blog" | "other", event: getAnalyticsArgs) => {
    try {
        const response = await prisma.analytics.findMany({
            where: {
                type: namespace,
                siteId: event.siteId || null,
                blogId: event.blogId || null,
                created_at: {
                    gte: new Date(new Date().setDate(new Date().getDate() - event.nDays))
                },
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

// type AnalyticsArgs = {
//     retention?: number
// }

// type TrackOptions = {
//     persist?: boolean
// }

// export class Analytics {
//     private retention: number = 60 * 60 * 24 * 365 // 1 yearx

//     constructor(opts?: AnalyticsArgs) {
//         if (opts?.retention) this.retention = opts.retention
//     }

//     async track(namespace: string, event: object = {}, opts?: TrackOptions) {
//         let key = `analytics::${namespace}`

//         if (!opts?.persist) {
//             key += `::${getDate()}`
//         }

//         // db call to persist this event
//         prisma.analytics.create({
//             data: {
//                 namespace,
//                 event: JSON.stringify(event),
//             },
//         })
//         await redis.hincrby(key, JSON.stringify(event), 1)
//         if (!opts?.persist) await redis.expire(key, this.retention)
//     }

//     async retrieveDays(namespace: string, nDays: number) {
//         type AnalyticsPromise = ReturnType<typeof analytics.retrieve>
//         const promises: AnalyticsPromise[] = []

//         for (let i = 0; i < nDays; i++) {
//             const formattedDate = getDate(i)
//             const promise = analytics.retrieve(namespace, formattedDate)
//             promises.push(promise)
//         }

//         const fetched = await Promise.all(promises)

//         const data = fetched.sort((a, b) => {
//             if (
//                 parse(a.date, 'dd/MM/yyyy', new Date()) >
//                 parse(b.date, 'dd/MM/yyyy', new Date())
//             ) {
//                 return 1
//             } else {
//                 return -1
//             }
//         })

//         return data
//     }

//     async retrieve(namespace: string, date: string) {
//         const res = await redis.hgetall<Record<string, string>>(
//             `analytics::${namespace}::${date}`
//         )

//         return {
//             date,
//             events: Object.entries(res ?? []).map(([key, value]) => ({
//                 [key]: Number(value),
//             })),
//         }
//     }
// }

// export const analytics = new Analytics()