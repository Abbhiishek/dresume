/* eslint-disable @next/next/no-img-element */

function TechStack() {


    const TechStack = [

        {
            name: "Python",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            tag: ["programming-language"],
            category: ["programming-language"],
        },
        {
            name: "Python",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            tag: ["programming-language"],
            category: ["programming-language"],
        },
        {
            name: "Python",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            tag: ["programming-language"],
            category: ["programming-language"],
        },
        {
            name: "Python",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            tag: ["programming-language"],
            category: ["programming-language"],
        },
        {
            name: "Python",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            tag: ["programming-language"],
            category: ["programming-language"],
        },
        {
            name: "Python",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            tag: ["programming-language"],
            category: ["programming-language"],
        },
        {
            name: "Python",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            tag: ["programming-language"],
            category: ["programming-language"],
        },
        {
            name: "Python",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            tag: ["programming-language"],
            category: ["programming-language"],
        },
    ]

    return (
        <div id="Skills" className="min-h-[500px]  my-4 pt-5">
            <h4 className="text-6xl font-light mt-5">Tech I&apos;m Familiar With</h4>
            <div className="flex flex-col gap-5">
                <div className="text-left">
                    <div className="relative ">
                        <h1
                            className="absolute -top-20 left-3 opacity-10 uppercase font-bold lg:text-8xl text-5xl font-title"
                        >
                            skills
                        </h1>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    {
                        TechStack.map((skill, index) => (
                            <div className="lg:basis-2/12 pt-4 md:pb-0 " key={index}>
                                <div
                                    className="flex flex-row items-center justify-start duration-200 
                                    gap-4 transition-all hover:bg-stone-800 rounded-2xl px-3 py-2">
                                    <img src={skill.icon} alt={skill.name} className="w-16 h-16" />
                                    <p className="text-center text-sm lg:text-lg font-semibold">{skill.name}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default TechStack