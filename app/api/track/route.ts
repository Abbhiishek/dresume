import prisma from "@/lib/db";
import { NextRequest } from "next/server";
import UAParser from 'ua-parser-js';

async function handler(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') ?? '';
    const uaParser = new UAParser();
    uaParser.setUA(userAgent);
    const os = uaParser.getOS().name;
    const v = uaParser.getEngine().name;
    const browser = uaParser.getBrowser().name;
    const ip = request.ip || request.headers.get('X-Forwarded-For');
    const ipinfo = await fetch(`https://ipinfo.io/${ip}/json`).then((res) => res.json());

    if (request.method === "GET") {
        try {
            return Response.json({
                status: "ok! lookup created",
                ip: ip,
                ipinfo: ipinfo,
                os: os,
                browser: browser,
                v: {
                    type: v,
                    viewport: {
                        messae: "hjdklqehlk"
                    }
                }
            });
        }
        catch (err) {
            console.error({ error: err })
            return Response.json({ error: err });
        }
    } else if (request.method === "POST") {

        const payload = await request.json();
        const { namespace, event } = payload


        try {
            const response = await prisma.analytics.create({
                data: {
                    type: namespace,
                    os: os,
                    browser: browser,
                    device: "web",
                    location: `${ipinfo.city}, ${ipinfo.region}, ${ipinfo.country}`,
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

            return Response.json({ status: "tracked !", response: response });
        } catch (error) {
            console.error({ error: error })
            return Response.json({ error: error });
        }
    } else {
        return Response.json({ error: "Method not allowed" }, { status: 405 });
    }
}


export const GET = handler;
export const POST = handler;