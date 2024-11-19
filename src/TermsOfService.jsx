import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./components/ui/card";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const description = "Privacy Policy Component";

function TermsOfService() {
  return (
    <>
        <Navbar />
        <Card className="flex flex-col p-6 mx-52 my-16">
        <CardHeader className="items-center pb-4">
            <CardTitle className="text-3xl font-bold">
            LiftCo Terms of Service
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
            Effective Date: 15/10/2024
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

            <p className="mb-4">
            This is the terms of use agreement (the <strong>"Agreement"</strong>) that governs your use of LiftCo's website,
            apps, and services. If you do not agree with these terms, please stop using LiftCo's website, uninstall our
            apps, and refrain from using our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">General Terms</h2>
            <p className="mb-4">
            LiftCo may change any of the terms and conditions in this Agreement at any time for any reason. A notice of
            material change will be posted on LiftCo's website, and you are responsible for reviewing the changes. If you
            do not agree with them, do not continue to use LiftCo's website, uninstall our apps, and refrain from using
            our services.
            </p>
            <p className="mb-4">
            LiftCo does not provide any guarantee or warranty of the accuracy of any data or AI-generated content. By
            using LiftCo, you are certifying that you are over 16 years of age or have your legal guardian's permission
            if you are between 13 and 16 years old.
            </p>
            <p className="mb-4">
            The services LiftCo provides include AI-powered creation and updating of social media kits. The resulting
            content is generated based on publicly available information and user inputs. While the AI-generated content is
            unique, the underlying data used to create it may come from various public sources.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Content Rights</h2>
            <p className="mb-4">
            The content created using LiftCo's services is owned by you, the user. However, you grant LiftCo a
            non-exclusive, worldwide, royalty-free license to use, reproduce, and display your content for the purpose of
            providing and improving our services.
            </p>
            <p className="mb-4">
            Sharing content created with LiftCo is allowed, provided you credit LiftCo as the tool used to generate the
            content. The acceptable way to do this is to provide a link back to LiftCo's website and clearly state in text
            that LiftCo was used to create the content. This includes sharing on social media websites, blogs, and in any
            sort of publication.
            </p>
            <p className="mb-4">
            Content shared from LiftCo on video platforms should include a link in the description and a verbal or written
            acknowledgment of LiftCo as the tool used to create the content in the video itself.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Usage Restrictions</h2>
            <p className="mb-4">
            Mass copying of data or content from LiftCo's website (including botting, crawling, scraping, etc.) is not
            allowed and may result in you being blocked from LiftCo's website and services. The only way you may gather
            large amounts of data or content is through our designated export functions or by requesting data directly from
            LiftCo (email our staff or submit a support ticket).
            </p>
            <p className="mb-4">
            It is LiftCo's policy to respect the privacy settings of the social media accounts you connect to our service.
            If you want us to stop accessing or using data from your connected accounts, you can disconnect them through
            your account settings or by contacting our support team.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Sources</h2>
            <p className="mb-4">
            In order to provide our AI-powered services, LiftCo utilizes API services of third parties including but not
            limited to Facebook, Instagram, YouTube, and other social media platforms. Unless specific access is asked for
            at the time of use (i.e., to validate your identity or access your account data), we are only gathering publicly
            available data from each of the API services, not anything private about your account.
            </p>
            <p className="mb-4">
            When private data access is granted, collected data via the private token is used to personalize your experience
            and improve our AI models. You can revoke access at any time via each platform's connected services page or by
            opening a support ticket, and we will delete the token from our system. If you wish to delete your account
            entirely, including all connected accounts, you can do so via the account settings page.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">AI-Generated Content</h2>
            <p className="mb-4">
            LiftCo uses AI technology to generate and update social media kits. While we strive for high-quality results,
            we cannot guarantee that the AI-generated content will be error-free, appropriate for all contexts, or free from
            potential biases. Users are responsible for reviewing and editing the AI-generated content before using it in
            their social media strategies.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Service Limitations</h2>
            <p className="mb-4">
            LiftCo will use best practices and cutting-edge AI technology to create and update social media kits, but
            results are not guaranteed. The effectiveness of the generated content may vary depending on various factors
            outside of our control.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
            <p className="mb-4">
            The LiftCo platform, including its software, algorithms, and user interface, is the intellectual property of
            LiftCo. Users are granted a limited, non-exclusive license to use the platform for its intended purpose. Any
            attempt to reverse engineer, decompile, or otherwise extract the underlying code or algorithms is strictly
            prohibited.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Disclaimer of Warranties</h2>
            <p className="mb-4">
            LiftCo provides its services on an "as is" and "as available" basis. We do not warrant that the service will
            be uninterrupted, error-free, or completely secure. Any reliance you place on the service or its content is at
            your own risk.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
            <p className="mb-4">
            To the fullest extent permitted by applicable law, LiftCo shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or
            indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our
            services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Governing Law</h2>
            <p className="mb-4">
            This Agreement shall be governed by and construed in accordance with the laws of the United Kingdom, without
            regard to its conflict of law provisions.
            </p>

            <hr className="my-8" />

            <p className="text-sm">
            <strong>
                This Document is Effective as of 15/10/2024. Last Updated: 15/10/2024.
            </strong>
            </p>
        </CardContent>
        </Card>
        <Footer className="border-t-[1px] border-black" />
    </>
  );
}

export default TermsOfService;
