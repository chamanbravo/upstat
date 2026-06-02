export default function HomePage() {
  return (
    <div className="overflow-hidden bg-[#04050C] p-4">
      <section className="py-8 container mx-auto flex flex-col lg:flex-row max-w-[1300px]">
        <div className="relative z-10 flex-1 lg:top-16">
          <a
            href="https://github.com/chamanbravo/upstat/stargazers"
            target="_blank"
            className="inline-block px-3 border rounded-full text-sm font-bold py-[6px] border-[#7C87F7]/[0.36] bg-[#7C87F7]/10 leading-[121%] tracking-[0.045em]"
          >
            <div className="text-xs font-bold text-gray-400">
              Proudly Open Source
            </div>
          </a>
          <h2 className="mt-4 logs-text font-semibold md:whitespace-nowrap text-[44px] md:text-[56px] leading-[105%] text-white">
            Simple & easy
            <div className="pb-1">status monitoring.</div>
          </h2>
          <p className="mt-3 md:text-large-18 text-gray-400 max-w-[418px]">
            Monitor your API and website with an open-source, self-hosted tool
            that alerts you to performance issues and downtime before users are
            affected.
          </p>
          <p className="inline-flex gap-4 mt-6 md:text-large-18">
            <a
              className="-m-1 p-1 px-4 group inline-flex items-center bg-[#434eac] font-medium text-gray-200 rounded-md hover:opacity-95"
              href="https://github.com/chamanbravo/upstat"
              target="_blank"
            >
              Get Started{" "}
            </a>
            <a
              className="-m-1 p-1 px-4 group inline-flex items-center border text-[#7c87f7] border-[#434eac] font-medium rounded-md hover:text-gray-200 hover:bg-[#434eac]"
              href="https://upstat.chamanbudhathoki.com.np"
              target="_blank"
            >
              Demo
            </a>
          </p>
          <div className="flex flex-col gap-4 mt-16 mr-8 md:flex-row md:gap-6 h-fit">
            <div className="group block p-6 flex-1 rounded-xl border transition lg:w-[270px] bg-[#0B0C14] hover:bg-[#727DA1]/10 border-[#727DA1]/15">
              <div className="mt-3 font-medium text-white">
                Uptime monitoring
              </div>
              <p className="mt-1 text-gray-400">
                Check uptime, SSL, ports, DNS, and more. Get notified any
                performance issues.
              </p>
            </div>
            <div className="group p-6 flex-1 rounded-xl border transition flex flex-col justify-between lg:w-[270px] bg-[#0B0C14] hover:bg-[#727DA1]/10 border-[#727DA1]/15">
              <div>
                <div className="mt-3 font-medium text-white">Status Pages</div>
                <p className="mt-1 text-gray-400">
                  Share your uptime with a status page. Keep your customers
                  informed and build trust.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 relative -mx-5 lg:mx-0 lg:-left-[8rem]">
          <img
            width="943"
            height="677"
            className="absolute top-0 left-0 hidden lg:block max-w-none lazyloaded"
            alt="upstat dashboard"
            src="/upstat.webp"
          />
          <div className="lg:h-[677px]"></div>
        </div>
      </section>

      <section className="py-8 container mx-auto flex flex-col lg:flex-row max-w-[1300px]">
        <div className="flex flex-col items-center w-full gap-10">
          <div className="flex flex-col items-center w-full">
            <h2 className="logs-text text-transparent font-semibold md:whitespace-nowrap text-[18px] md:text-[24px] leading-[130%] title-text text-center w-full">
              Everything you need.
            </h2>
            <p className="mt-3 text-center text-gray-400 md:text-large-18">
              Discover upstat streamlines your workflow, enhances reliability,
              and drives operational excellence.
            </p>
          </div>
          <div className="flex flex-wrap justify-between w-full gap-6">
            <div className="p-6 flex-1 rounded-xl border transition flex flex-col gap-2 w-full bg-[#0B0C14] border-[#727DA1]/15 min-w-[350px]">
              <div>
                <img
                  alt="upstat real time monitoring"
                  src="/real-time-monitor.webp"
                />
              </div>
              <h4 className="mt-2 text-xl font-medium text-white">
                Real-Time Monitoring
              </h4>
              <p className="text-gray-400">
                Instantly detect downtime and performance issues before they
                impact users.
              </p>
            </div>
            <div className="p-6 flex-1 rounded-xl border transition flex flex-col gap-2 w-full bg-[#0B0C14] border-[#727DA1]/15 min-w-[350px]">
              <div>
                <img alt="upstat status pages" src="/status-pages.webp" />
              </div>
              <h4 className="mt-2 text-xl font-medium text-white">
                Customizable Status Pages
              </h4>
              <p className="text-gray-400">
                Keep your team and users informed with branded, real-time status
                updates.
              </p>
            </div>
            <div className="p-6 flex-1 rounded-xl border transition flex flex-col gap-2 w-full bg-[#0B0C14] border-[#727DA1]/15 min-w-[350px]">
              <div>
                <img
                  alt="upstat incident notifications"
                  src="/notifications.png"
                />
              </div>
              <h4 className="mt-2 text-xl font-medium text-white">
                Notifications
              </h4>
              <p className="text-gray-400">
                Get instant alerts via email, Slack, or webhooks when your site
                goes down.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 container mx-auto flex flex-col lg:flex-row max-w-[1300px] text-[#c9d3ee] gap-2 items-center justify-center">
        <span className="text-sm"> Upstat </span>
        <span className="hidden text-sm sm:block">•</span>
        <span className="text-sm">
          <a
            href="https://github.com/chamanbravo/upstat"
            target="_blank"
            className="text-sm underline"
          >
            Github
          </a>
        </span>
        <span className="text-sm">
          <a
            href="mailto:hello@chamanbudhathoki.com.np"
            target="_blank"
            className="text-sm underline"
          >
            Email
          </a>
        </span>
      </footer>
    </div>
  );
}
