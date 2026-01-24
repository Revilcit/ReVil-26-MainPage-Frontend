export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 font-orbitron">
          Refunds & Cancellations Policy
        </h1>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Overview</h2>
            <p className="leading-relaxed">
              This Refunds & Cancellations Policy outlines the terms for
              cancellations and refunds for REVIL 2026 events, workshops, and
              services. We strive to be fair and transparent in all refund
              matters.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Applicable Services & Pricing
            </h2>
            <p className="leading-relaxed mb-4">
              This policy applies to the following REVIL 2026 services:
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3 mt-6">
              Paid Workshops
            </h3>
            <div className="space-y-2 ml-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Embedded Systems 101</span>
                <span className="text-primary font-bold">₹100 INR</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">From Noise to Knowledge</span>
                <span className="text-primary font-bold">₹100 INR</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Offensive Security</span>
                <span className="text-primary font-bold">₹100 INR</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-primary mb-3 mt-6">
              Free Events
            </h3>
            <p className="text-gray-300 ml-4">
              All technical events (Beneath the Mask, Escape Room, CTF – Trial
              of the Creed) are FREE. No payment required, but registration is
              mandatory.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. Cancellation by Participant
            </h2>

            <h3 className="text-xl font-semibold text-primary mb-3 mt-6">
              Paid Workshops (₹100 INR)
            </h3>
            <p className="leading-relaxed mb-4">
              If you wish to cancel your workshop registration:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong className="text-white">
                  More than 7 days before workshop:
                </strong>{" "}
                Full refund (₹100) minus processing fees (₹2-3)
              </li>
              <li>
                <strong className="text-white">
                  4-7 days before workshop:
                </strong>{" "}
                50% refund (₹50)
              </li>
              <li>
                <strong className="text-white">
                  Less than 4 days before workshop:
                </strong>{" "}
                No refund
              </li>
              <li>
                <strong className="text-white">No-show:</strong> No refund
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-primary mb-3 mt-6">
              Free Events
            </h3>
            <p className="leading-relaxed">
              Free events can be cancelled anytime through your dashboard.
              However, repeated no-shows may result in restrictions on future
              registrations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Cancellation by Organizers
            </h2>
            <p className="leading-relaxed mb-4">
              If REVIL 2026 cancels an event:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Participants will receive full refund (100%)</li>
              <li>
                Notification will be sent to registered email within 24 hours
              </li>
              <li>Refund will be processed within 7-10 business days</li>
              <li>Alternative event dates or transfers may be offered</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. How to Request a Refund
            </h2>
            <p className="leading-relaxed mb-4">To request a refund:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>
                Contact us through our{" "}
                <a
                  href="/contact"
                  className="text-primary hover:text-white underline"
                >
                  Contact Page
                </a>
              </li>
              <li>Provide your order ID and registration email</li>
              <li>State the reason for cancellation</li>
              <li>Wait for confirmation (within 48 hours)</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Refund Processing
            </h2>
            <p className="leading-relaxed mb-4">Once approved:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Refunds are processed to the original payment method</li>
              <li>Processing time: 7-10 business days from approval</li>
              <li>Bank processing may take additional 3-5 days</li>
              <li>
                You will receive confirmation email once refund is initiated
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Processing Fees
            </h2>
            <p className="leading-relaxed">
              Payment gateway processing fees (typically 2-3% of transaction
              amount) are non-refundable and will be deducted from the refund
              amount for participant-initiated cancellations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Event Changes
            </h2>
            <p className="leading-relaxed mb-4">
              If REVIL 2026 makes significant changes to an event:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Participants will be notified at least 48 hours in advance
              </li>
              <li>Option to accept changes or request full refund</li>
              <li>
                Minor changes (time/venue adjustments) don't qualify for refunds
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              9. Non-Refundable Items
            </h2>
            <p className="leading-relaxed mb-4">
              The following are non-refundable:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Digital resources already accessed or downloaded</li>
              <li>Completed workshops or events</li>
              <li>Administrative fees and taxes</li>
              <li>Third-party fees and charges</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              10. Transfer of Registration
            </h2>
            <p className="leading-relaxed mb-4">
              Registration transfers to another participant:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Allowed up to 48 hours before the event</li>
              <li>Must be requested through official channels</li>
              <li>Subject to approval by organizers</li>
              <li>Nominal processing fee may apply</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              11. Force Majeure
            </h2>
            <p className="leading-relaxed">
              In case of unforeseen circumstances beyond our control (natural
              disasters, pandemics, government restrictions), REVIL 2026
              reserves the right to cancel events. In such cases, we will work
              with participants to provide alternatives such as virtual events,
              rescheduling, or partial refunds based on costs already incurred.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Disputes</h2>
            <p className="leading-relaxed">
              Any disputes regarding refunds will be handled on a case-by-case
              basis. We encourage open communication and will work to find fair
              solutions. All refund decisions by REVIL 2026 management are
              final.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              13. Contact for Refunds
            </h2>
            <p className="leading-relaxed">
              For refund inquiries or cancellation requests:{" "}
              <a
                href="/contact"
                className="text-primary hover:text-white underline"
              >
                Contact Us
              </a>
            </p>
            <p className="leading-relaxed mt-4">
              Please include your Order ID and registered email address in all
              communications.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-500">
              Last Updated: January 24, 2026
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This policy is subject to change. Please check this page regularly
              for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
