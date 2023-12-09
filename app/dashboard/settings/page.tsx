import { TypographyH2 } from "@/components/common/Typography";
import Form from "@/components/form";
import { editUser } from "@/lib/actions";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
// import { editUser } from "@/lib/actions";
export default async function SettingsPage() {
    const user = auth();
    if (!user) {
        return redirect("/sign-in");
    }

    const userdetails = await prisma.user.findUnique({
        where: {
            id: user.userId!,
        },
    });

    console.log(userdetails)

    // 1. Define your form.


    return (
        <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
            <div className="flex flex-col space-y-6">
                <h1 className="font-cal text-3xl font-bold dark:text-white">
                    User Settings 🌱
                </h1>
                {/* <EditProfile user={userdetails!} action={editUser} /> */}
                <Form
                    title="Avatar"
                    description="This is Visible on your Portfolio"
                    helpText="use a smaller size image"
                    inputAttrs={{
                        name: "avatar",
                        type: "avatar",
                        defaultValue: userdetails?.avatar!,
                        placeholder: "Brendon Urie",
                        maxLength: 32,
                    }}
                    handleSubmit={editUser}
                />
                <Form
                    title="First Name"
                    description="Your First name on this app."
                    helpText="Please use 32 characters maximum."
                    inputAttrs={{
                        name: "firstname",
                        type: "text",
                        defaultValue: userdetails?.firstname!,
                        placeholder: "Brendon Urie",
                        maxLength: 32,
                    }}
                    handleSubmit={editUser}
                />
                <Form
                    title="Last Name"
                    description="Your First name on this app."
                    helpText="Please use 32 characters maximum."
                    inputAttrs={{
                        name: "lastname",
                        type: "text",
                        defaultValue: userdetails?.lastname!,
                        placeholder: "Brendon Urie",
                        maxLength: 32,
                    }}
                    handleSubmit={editUser}
                />
                <Form
                    title="Your bio"
                    description="Write a bio (this will be visible in your portfolio)"
                    helpText=""
                    inputAttrs={{
                        name: "bio",
                        type: "description",
                        defaultValue: userdetails?.bio!,
                        placeholder: userdetails?.bio!,
                        maxLength: 2500,
                    }}
                    handleSubmit={editUser}
                />
                <TypographyH2>Social Media 🤖</TypographyH2>
                <Form
                    title="Twitter Profile"
                    description="(this will be visible in your portfolio)"
                    helpText=""
                    inputAttrs={{
                        name: "twitterid",
                        type: "text",
                        defaultValue: userdetails?.twitterid!,
                        placeholder: userdetails?.twitterid!,
                        maxLength: 2500,
                    }}
                    handleSubmit={editUser}
                />
                <Form
                    title="Linkedin Profile"
                    description="(this will be visible in your portfolio)"
                    helpText=""
                    inputAttrs={{
                        name: "linkedinid",
                        type: "text",
                        defaultValue: userdetails?.linkedinid!,
                        placeholder: userdetails?.linkedinid!,
                        maxLength: 2500,
                    }}
                    handleSubmit={editUser}
                />
                <Form
                    title="Github Profile"
                    description="(this will be visible in your portfolio)"
                    helpText=""
                    inputAttrs={{
                        name: "githubid",
                        type: "text",
                        defaultValue: userdetails?.githubid!,
                        placeholder: userdetails?.githubid!,
                        maxLength: 2500,
                    }}
                    handleSubmit={editUser}
                />
                <Form
                    title="Custom Website Url"
                    description="(this will be visible in your portfolio)"
                    helpText=""
                    inputAttrs={{
                        name: "websiteurl",
                        type: "text",
                        defaultValue: userdetails?.websiteurl!,
                        placeholder: userdetails?.websiteurl!,
                        maxLength: 2500,
                    }}
                    handleSubmit={editUser}
                />
            </div>
        </div>
    );
}
