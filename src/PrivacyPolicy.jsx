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

function PrivacyPolicy() {
  return (
    <>
        <Navbar />
        <Card className="flex flex-col p-6 mx-52 my-16">
        <CardHeader className="items-center pb-4">
            <CardTitle className="text-3xl font-bold">
            LiftCo Privacy Policy
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
            Effective Date: 15/10/2024
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <section>
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p className="mt-2">
                Welcome to LiftCo ("we," "our," "us"). We are committed to
                protecting your privacy and ensuring the security of your personal
                information. This Privacy Policy outlines how we collect, use,
                disclose, and safeguard your data when you use our services.
                LiftCo is a UK-based company that provides cutting-edge software
                for influencers, content creators, and social media managers,
                enabling them to create and update their social media kits in
                real-time using AI technology.
            </p>
            <p className="mt-2">
                By accessing or using our platform, you agree to the collection and
                use of your information in accordance with this Privacy Policy. If
                you do not agree with the terms of this Privacy Policy, please do
                not access or use our services.
            </p>
            <p className="mt-2">
                LiftCo may change any of the terms and conditions in this Policy
                at any time for any reason. A notice of material change will be
                posted on LiftCo's website, and you are responsible for reviewing
                the changes. If you do not agree with them, do not continue to use
                LiftCo's website, uninstall our apps, and refrain from using our
                data.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">2. Information We Collect</h2>
            <h3 className="text-lg font-medium mt-4">2.1 Personal Information</h3>
            <p className="mt-2">
                When you register or use our platform, we may collect the following
                personal information:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Name</li>
                <li>Email Address</li>
                <li>Username and Password</li>
                <li>Profile Information (including social media handles)</li>
                <li>Payment Information (if applicable)</li>
                <li>Contact Information (such as phone number)</li>
            </ul>

            <h3 className="text-lg font-medium mt-4">2.2 Non-Personal Information</h3>
            <p className="mt-2">
                We may also collect non-personal information that does not directly
                identify you. This may include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                <strong>Device Information:</strong> Type of device, operating
                system, browser type, and version.
                </li>
                <li>
                <strong>Usage Data:</strong> Pages you visit, time spent on the
                platform, and other interaction data.
                </li>
                <li>
                <strong>Location Data:</strong> General geographic location based
                on your IP address.
                </li>
            </ul>

            <h3 className="text-lg font-medium mt-4">2.3 Cookies and Tracking Technologies</h3>
            <p className="mt-2">
                We use cookies and similar tracking technologies to monitor activity
                on our platform and store certain information. Cookies help us
                provide a better user experience by remembering your preferences and
                enabling essential features.
            </p>
            </section>

            {/* Continue with the rest of the sections in the same format */}
            <section>
            <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
            <p className="mt-2">
                We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li>To Provide and Maintain Our Services</li>
                <li>To Improve Our Platform</li>
                <li>To Personalize Your Experience</li>
                <li>To Communicate With You</li>
                <li>To Process Payments</li>
                <li>To Ensure Security</li>
            </ul>
            </section>

            {/* Add other sections similarly */}
            <section>
            <h2 className="text-xl font-semibold">4. Public Information</h2>
            <p className="mt-2">
                Much of the data collected and shown on LiftCo is public data. We
                collect and display the same public data you'd see by visiting
                social media sites directly, such as follower counts and other
                publicly available metrics. If the information isn't shown publicly
                on those websites, it's not collected or shown on our website
                either.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">5. Data Sources</h2>
            <p className="mt-2">
                In order to keep statistical data updated, LiftCo utilizes API
                services of third parties including but not limited to Facebook,
                Instagram, YouTube, and other social media platforms. We only gather
                publicly available data from each of the API services, not anything
                private about your account.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">6. Sharing Your Information</h2>
            <p className="mt-2">
                We do not sell, trade, or rent your personal information to third
                parties. However, we may share your information in the following
                circumstances:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Service Providers</li>
                <li>Legal Compliance</li>
                <li>Business Transfers</li>
            </ul>
            <p className="mt-2">
                We may share aggregate information about users with third parties
                for marketing, advertising, research, or similar purposes.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">7. Security of Your Information</h2>
            <p className="mt-2">
                We take the security of your personal information seriously and
                implement reasonable measures to protect it from unauthorized
                access, disclosure, alteration, or destruction. However, please be
                aware that no method of transmission over the Internet or electronic
                storage is completely secure, and we cannot guarantee absolute
                security.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">8. Your Rights and Choices</h2>
            <p className="mt-2">
                You have the right to access, correct, and delete your personal
                information. You may also request data portability and opt out of
                marketing communications.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">9. User-Generated Content</h2>
            <p className="mt-2">
                If you post content on our platform or associated services, all the
                information posted and the username you identify yourself with will
                be available to the public. LiftCo cannot prevent your posting
                from being used in a manner that would violate this Policy, the law,
                or your personal privacy.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">10. Third-Party Links</h2>
            <p className="mt-2">
                LiftCo's site includes links to third-party websites. Access to
                and use of linked websites is governed by those third-party
                websites' privacy policies. LiftCo is not responsible for their
                information practices.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">11. Children's Privacy</h2>
            <p className="mt-2">
                Our services are not intended for individuals under the age of 13.
                We do not knowingly collect personal information from children under
                13.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">12. Changes to This Privacy Policy</h2>
            <p className="mt-2">
                We may update our Privacy Policy from time to time. We will notify
                you of any significant changes by posting the new Privacy Policy on
                our platform and updating the effective date at the top of this
                page.
            </p>
            </section>

            <section>
            <h2 className="text-xl font-semibold">13. Contact Us</h2>
            <p className="mt-2">
                If you have any questions or concerns about this Privacy Policy or
                our data practices, please contact us at:
            </p>
            <p className="mt-2 font-medium">akua@LiftCo.co.uk</p>
            </section>

            <p className="mt-6">
            This Privacy Policy outlines how LiftCo protects your personal data.
            It is important to regularly review this document to stay informed of
            how your information is being handled.
            </p>
        </CardContent>
        </Card>
        <Footer className="border-t-[1px] border-black" />
    </>
  );
}

export default PrivacyPolicy;
