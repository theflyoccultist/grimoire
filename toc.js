// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="intro.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Debugging Grimoire - The Tome Of Cursed Knowledge</li><li class="chapter-item expanded "><a href="devops/index.html"><strong aria-hidden="true">1.</strong> DevOps</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="devops/github-ssh.html"><strong aria-hidden="true">1.1.</strong> Set Up SSH for GitHub</a></li><li class="chapter-item expanded "><a href="devops/gitactions-mdbook.html"><strong aria-hidden="true">1.2.</strong> Deploying mdBook to Github Pages with GitHub Actions</a></li><li class="chapter-item expanded "><a href="devops/gcloud-ci-cd.html"><strong aria-hidden="true">1.3.</strong> Cloud Run &amp; GitHub Actions CI/CD Setup</a></li><li class="chapter-item expanded "><a href="devops/gcloud-domain.html"><strong aria-hidden="true">1.4.</strong> How to Use Google Cloud Domain Mapping to setup a Custom Domain to your container</a></li><li class="chapter-item expanded "><a href="devops/gcloud-host-files.html"><strong aria-hidden="true">1.5.</strong> How to Host Images (or other files) on Google Cloud Storage</a></li><li class="chapter-item expanded "><a href="devops/postgres-testing.html"><strong aria-hidden="true">1.6.</strong> Set Up PostgreSQL for Testing Environments</a></li><li class="chapter-item expanded "><a href="devops/postgres-gcloud.html"><strong aria-hidden="true">1.7.</strong> PostgreSQL Production Setup on Google Cloud SQL</a></li></ol></li><li class="chapter-item expanded "><a href="linux/index.html"><strong aria-hidden="true">2.</strong> Linux</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="linux/debian-nftables.html"><strong aria-hidden="true">2.1.</strong> Debian Firewall Configuration With nftables</a></li></ol></li><li class="chapter-item expanded "><a href="database/index.html"><strong aria-hidden="true">3.</strong> Database</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="database/postgres-local.html"><strong aria-hidden="true">3.1.</strong> PostgreSQL Local Setup Guide</a></li><li class="chapter-item expanded "><a href="database/postgres-ratelimiting.html"><strong aria-hidden="true">3.2.</strong> How to Setup Rate Limiting in PostgreSQL</a></li><li class="chapter-item expanded "><a href="database/redis-setup.html"><strong aria-hidden="true">3.3.</strong> How to Boot Up Redis on Debian</a></li></ol></li><li class="chapter-item expanded "><a href="cheatsheet/index.html"><strong aria-hidden="true">4.</strong> Cheat Sheet</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="cheatsheet/github.html"><strong aria-hidden="true">4.1.</strong> GitHub Cheat Sheet</a></li><li class="chapter-item expanded "><a href="cheatsheet/yaml-cheatsheet.html"><strong aria-hidden="true">4.2.</strong> YAML Cheat Sheet</a></li></ol></li><li class="chapter-item expanded "><a href="programming/index.html"><strong aria-hidden="true">5.</strong> Programming Languages</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="programming/cpp/index.html"><strong aria-hidden="true">5.1.</strong> C++ 💀</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="programming/cpp/basics.html"><strong aria-hidden="true">5.1.1.</strong> C++ Fundamentals</a></li><li class="chapter-item expanded "><a href="programming/cpp/oop.html"><strong aria-hidden="true">5.1.2.</strong> OOP</a></li><li class="chapter-item expanded "><a href="programming/cpp/templates.html"><strong aria-hidden="true">5.1.3.</strong> Templates</a></li><li class="chapter-item expanded "><a href="programming/cpp/algorithms.html"><strong aria-hidden="true">5.1.4.</strong> Algorithms</a></li></ol></li><li class="chapter-item expanded "><a href="programming/ruby/index.html"><strong aria-hidden="true">5.2.</strong> Ruby 💎</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="programming/ruby/ruby-basics.html"><strong aria-hidden="true">5.2.1.</strong> Ruby Fundamentals</a></li><li class="chapter-item expanded "><a href="programming/ruby/ruby-functional.html"><strong aria-hidden="true">5.2.2.</strong> Ruby as a Functional Language</a></li></ol></li><li class="chapter-item expanded "><a href="programming/python/index.html"><strong aria-hidden="true">5.3.</strong> Python 🐍</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="programming/python/basics.html"><strong aria-hidden="true">5.3.1.</strong> Python Fundamentals</a></li><li class="chapter-item expanded "><a href="programming/python/control_flow.html"><strong aria-hidden="true">5.3.2.</strong> Control Flow</a></li><li class="chapter-item expanded "><a href="programming/python/functions.html"><strong aria-hidden="true">5.3.3.</strong> Functions</a></li><li class="chapter-item expanded "><a href="programming/python/oop.html"><strong aria-hidden="true">5.3.4.</strong> OOP</a></li><li class="chapter-item expanded "><a href="programming/python/advanced.html"><strong aria-hidden="true">5.3.5.</strong> Advanced</a></li><li class="chapter-item expanded "><a href="programming/python/errors.html"><strong aria-hidden="true">5.3.6.</strong> Errors</a></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
