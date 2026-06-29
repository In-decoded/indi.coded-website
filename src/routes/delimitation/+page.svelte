<script>
    import { onMount } from "svelte";
    import { initDelimitation } from "$lib/delimitation.js";

    onMount(() => {
        initDelimitation();
        const processObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = /** @type {HTMLElement} */ (entry.target);
                        activeProcess = parseInt(target.dataset.process || "0");
                    }
                });
            },
            { rootMargin: "-40% 0px -40% 0px" },
        );

        document
            .querySelectorAll(".process-trigger")
            .forEach((el) => processObserver.observe(el));
    });

    let stackIndex = $state(0);
    const stackData = [
        {
            heading: "Population Distribution",
            caption:
                "In this region, there are 40% Urban voters and 60% Rural voters",
            img: "/gerrymander-1.png",
        },
        {
            heading: "Existing Constituencies",
            caption:
                "Delimitation occurs in favour of Rural voters in all constituencies",
            img: "/gerrymander-2.png",
        },
        {
            heading: "After Delimitation",
            caption:
                "Delimitation occurs in favour of Urban voters in constituencies A & B and Rural voters in C & D",
            img: "/gerrymander-3.png",
        },
    ];

    function nextStack() {
        stackIndex = (stackIndex + 1) % stackData.length;
    }

    let activeProcess = $state(3);

    /** @type {string | null} */
    let hoveredRegion = $state(null);
    const regions = [
        { id: "northern", label: "Northern states", color: "#bf360c" }, // Deep orange/red
        { id: "other", label: "Other states", color: "#ffb74d" }, // Light orange
        { id: "southern", label: "Southern states", color: "#795548" } // Brown
    ];
    const vizRows = [
        { label: "Seat share in Parliament", data: { northern: 43, other: 33, southern: 24 } },
        { label: "Population share (1971)", data: { northern: 43, other: 32, southern: 25 } },
        { label: "Population share (2026)", data: { northern: 50, other: 30, southern: 20 } }
    ];

    /**
     * @param {number} rowIdx
     * @param {"northern" | "other" | "southern"} regionId
     */
    function getSegment(rowIdx, regionId) {
        const row = vizRows[rowIdx].data;
        let start = 0;
        if (regionId === "other") start = row.northern;
        if (regionId === "southern") start = row.northern + row.other;
        return {
            x: 320 + (start / 100) * 440,
            w: (row[regionId] / 100) * 440,
            val: row[regionId]
        };
    }
</script>

<section id="intro">
    <div
        style="max-width: 1000px; margin: 0 auto 40px auto; text-align: center;"
    >
        <img
            src="/delimitation-hero.png"
            alt="Where do we draw the line? A Visual Journey Through India's Delimitation Dilemma"
            style="width: 100%; height: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);"
        />
        <p
            style="font-family: 'Instrument Serif', serif; font-size: 1.6rem; color: #5d4037; margin-top: 20px; font-style: italic; text-align: center;"
        >
            by Arnab Jena
        </p>
    </div>
    <div class="intro-text">
        <p>
            A key function of democracy is to ensure that political
            representatives effectively represent the interests of all their
            constituents. In order for this to successfully happen, electoral
            constituencies must be drawn in a manner that each political
            representative represents a population of roughly equal size. This
            ensures that the vote of each person has the same value in
            representative houses such as the Parliament and State legislatures.
        </p>
        <p>
            To ensure that each <span class="handdrawn-box"
                >Member of Parliament (MP)<span class="tooltip-text"
                    >An MP represents a constituency in the Lok Sabha (lower
                    house of India's Parliament).</span
                ></span
            >
            or
            <span class="handdrawn-box"
                >Member of Legislative Assembly (MLA)<span class="tooltip-text"
                    >An MLA represents a constituency in a State Legislative
                    Assembly.</span
                ></span
            >
            represents a population of approximately similar size, each State is
            divided into territorial constituencies. This process of drawing electoral
            constituencies based on updated population figures from the Census is
            known as <strong>‘delimitation’</strong>.
        </p>

        <aside class="did-you-know">
            <div class="dyk-title">Did you know?</div>
            <p>
                While the population census is typically conducted every 10
                years, the primary governing laws (the Census Act 1948 & Rules
                1990) do not mention any time frame. The Census in India is thus
                conducted every 10 years purely as a matter of tradition!
            </p>
        </aside>

        <p>
            While the Constitution enshrines the principle of equality of votes,
            the situation on the ground tells a different story. The
            apportionment of seats in the Lok Sabha has not been updated based
            on a new census since the 1970s. Currently, every person in India
            has an equal right to vote, however their vote does not have the
            same value. This freeze has taken the delay to almost six decades as
            of now, raising several federal concerns about skewed representation
            in our highest legislative bodies.
        </p>

        <h2>What is delimitation?</h2>
        <p>
            Delimitation is the process of drawing the limits of territorial <span
                class="handdrawn-box"
                >constituencies<span class="tooltip-text"
                    >A constituency is a geographically-defined area which
                    comprises of voters who elect a representative to a larger
                    representative body such as the Parliament or the State
                    Legislative Assembly. The elected representative is
                    duty-bound to represent the grievances of the people in
                    their constituency.</span
                ></span
            > for elections to representative bodies in India ranging from the Parliament
            to the State Legislatures, as well as urban and rural local bodies such
            as Panchayats and Municipalities. The Delimitation Commission, which
            is an executive body responsible for this task, conducts delimitation,
            proportionally based on the population. According to this principle,
            each State is divided into constituent units in such a manner that the
            population of each unit is more or less the same.
        </p>
        <p>
            Delimitation translates into a periodic exercise because it is
            primarily based on population as a factor which is constantly
            changing. The division into territorial constituencies is required
            to be readjusted after the completion of every population census.
            For instance, the last delimitation in 2008 was conducted using the
            data from the 2001 census. As the law currently stands, there is a
            freeze on the readjustment of territorial constituencies until the
            figures of the post-2026 census are published.
        </p>

        <figure class="intro-diagram">
            <img
                src="/delimitation-diagram.png"
                alt="Diagram explaining delimitation equalizing population density"
            />
            <figcaption>
                <em
                    >In the left box, territorial constituencies are equal in
                    geographical size but unequal in population density. In the
                    right box, though the constituencies are unequal in
                    geographical size, they roughly have the same population
                    density after delimitation.</em
                >
            </figcaption>
        </figure>

        <h2>Why do we need to talk about delimitation?</h2>
        <p>
            The Constitution, in a bid to ensure equality between the values of
            the votes of different voters in India, requires seats in the Lok
            Sabha to be allocated to states in proportion to their population.<sup
                >1</sup
            >
            Despite the fact that the Constitution mandates that the allocation of
            seats in the Lok Sabha and the division of each state into territorial
            constituencies shall be readjusted after each
            <span class="handdrawn-box"
                >census<span class="tooltip-text"
                    >The Census of India is a comprehensive survey providing
                    demographic, social, and economic data of the population,
                    traditionally conducted every 10 years.</span
                ></span
            >, such periodic readjustment has not followed every Census in
            India.
            <mark
                >The last redistribution of Lok Sabha seats between states was
                done in 1972, more than 5 decades ago!</mark
            >
        </p>
        <p>
            The 1972 delimitation was based on the 1971 Census.<sup>2</sup> Till
            today 1971 population figures are taken as the base population for redistribution
            of seats in Lok Sabha.
        </p>

        <div class="table-container">
            <table class="delimitation-table">
                <thead>
                    <tr>
                        <th colspan="5" class="table-title"
                            >Delimitation exercises in India</th
                        >
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th class="row-header">Year started</th>
                        <td>1952</td>
                        <td>1962</td>
                        <td>1972</td>
                        <td>2002</td>
                    </tr>
                    <tr>
                        <th class="row-header">Census figures</th>
                        <td>1951 Census</td>
                        <td>1961 Census</td>
                        <td>1971 Census</td>
                        <td>2001 Census</td>
                    </tr>
                    <tr>
                        <th class="row-header"
                            >Number of<br />Lok Sabha Seats</th
                        >
                        <td>489</td>
                        <td>494</td>
                        <td>542</td>
                        <td>543<sup>3</sup></td>
                    </tr>
                    <tr>
                        <th class="row-header">What was done?</th>
                        <td
                            >Allocation of Lok Sabha and Assembly seats +
                            Redrawing of constituency boundaries</td
                        >
                        <td
                            >Allocation of Lok Sabha and Assembly seats +
                            Redrawing of constituency boundaries</td
                        >
                        <td
                            >Allocation of Lok Sabha and Assembly seats +
                            Redrawing of constituency boundaries</td
                        >
                        <td>Redrawing of constituency boundaries</td>
                    </tr>
                </tbody>
            </table>
            <div class="table-footnotes">
                <p><sup>1</sup> The Delimitation Act 1972, art 81.</p>
                <p><sup>2</sup> The Delimitation Act 1972.</p>
                <p>
                    <sup>3</sup> An extra seat was added to accommodate the new State
                    of Sikkim in 1974 by the Constitution (Thirty-fifth Amendment)
                    Act 1974.
                </p>
            </div>
        </div>

        <p>
            Since the 1970s, there has been no change in the number of Lok Sabha
            as well as State Assembly constituencies. The irregularity in the
            exercise started in 1976, when the 42nd Constitutional Amendment
            suspended the revision of seats in Lok Sabha and State Assemblies
            until after the 2001 Census. This froze the Lok Sabha seats at 543.
            The freeze was introduced to address concerns of those states that
            successfully implemented population control measures at that time.
            In 2001, the 84th Constitutional Amendment further pushed the freeze
            to 2026, with the relevant population figures to be sourced from the
            first Census after 2026. As a result of this freeze, <mark
                >India still relies on the 1971 Census for allocation of seats
                in the Parliament to States!</mark
            >
        </p>

        <div class="notebook-quote stacked-paper">
            <h2>What about the 2008 delimitation?</h2>
            <p>
                The last delimitation was done in 2008 based on the 2001 Census.
                In 2003, the 87th Amendments to the Constitution, allowed for
                redistricting within states based on 2001 population figures to
                account for population changes. However, the 2008 Delimitation
                order readjusted the boundaries of territorial constituencies
                without modifying the allocation of Lok Sabha and Assembly
                seats. <mark
                    >Thus, the Lok Sabha seats are still fixed at 543.</mark
                >
            </p>
        </div>

        <h2 style="color: #bf360c;">Why is that a problem?</h2>
        <p>
            By the time the first Census figures after 2026 will be published,
            <mark
                >the population figures used to allot parliamentary and assembly
                seats to each state will be 6 decades old.</mark
            >
        </p>

        <div class="table-container">
            <table class="delimitation-table problem-table">
                <tbody>
                    <tr>
                        <th class="row-header"
                            >Allocation of Seats to States in Lok Sabha</th
                        >
                        <td>1971 Census</td>
                    </tr>
                    <tr>
                        <th class="row-header"
                            >Allocation of Seats to State Assemblies based on
                            population figures</th
                        >
                        <td>1971 Census</td>
                    </tr>
                    <tr>
                        <th class="row-header"
                            >Division of each state into territorial
                            constituencies</th
                        >
                        <td>2001 Census</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p>
            In the preceding years, the population in India has seen a huge
            shift. The population in the northern states in India has increased
            at a relatively faster rate than the population of the southern
            states that saw prompt implementation of the family planning
            measures. This has led to under-representation of the more populous
            states (such as Uttar Pradesh, Bihar) and simultaneous
            over-representation of the less populous states (such as Kerala,
            Tamil Nadu) in the Lok Sabha.
        </p>
        <p>
            This improper representation of states in the Parliament has a
            direct bearing on the constitutional principles of <span
                style="color: #bf360c;"
                >‘one person, one value, and one vote’</span
            ><sup>4</sup> as well as
            <span style="color: #bf360c;"
                >‘federalism and balancing state interest’</span
            ><sup>5</sup>, because the value of one vote from each state
            differs. But how?
        </p>

        <div
            class="table-footnotes"
            style="margin-top: 30px; border-top: 1px solid rgba(93, 64, 55, 0.2); padding-top: 15px;"
        >
            <p>
                <sup>4</sup> The Delimitation Act 2002. This democratic principle
                ensures that every citizen's vote carries equal weight, requiring
                constituencies to be drawn with roughly equal populations.
            </p>
            <p>
                <sup>5</sup> Census 2011. This principle ensures that the diverse
                regional interests of different states are equitably represented,
                preventing more populous states from completely dominating the national
                legislature.
            </p>
        </div>
        <div
            class="viz-explanation"
            style="background: #fdfdfd; padding: 25px 35px; border: 1px solid #e5e5e5; border-radius: 4px; margin: 40px auto 30px auto; max-width: 680px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);"
        >
            <p
                style="font-family: 'Inter', sans-serif; font-size: 0.95rem; line-height: 1.7; color: #666; margin: 0; font-style: italic; text-align: center;"
            >
                <strong>Note:</strong> To bring this data to life, we've built
                an interactive <strong>cartogram</strong>. Unlike a standard
                geographic map, a cartogram physically morphs and distorts the
                size of each state to proportionally represent the data being
                discussed in such as population or parliamentary seats. As you
                scroll down, watch the borders shift to reveal the true scale of
                India's political and demographic disparities.
            </p>
        </div>
    </div>
</section>

<section id="scrolly">
    <div class="scrolly-map">
        <svg id="map-svg"></svg>
        <div class="tooltip" style="opacity:0;"></div>
        <div class="legend"></div>
    </div>

    <div class="scrolly-text">
        <div class="step" data-step="1">
            <h2>Current Map of India</h2>
            <p>
                India is a diverse nation with highly unequal population
                distribution. Uttar Pradesh alone has over 230 million people
                which is more than the entire country of Brazil. Meanwhile, the
                five southern states combined account for roughly 250 million.
                The geographic distribution of India's 1.4 billion people is
                heavily skewed towards the Gangetic plains.
            </p>
            <p>
                According to data from the 2011 census, Tamil Nadu and Uttar
                Pradesh have populations of approximately 7 crore and 20 crore,
                to their current population?
            </p>
            <p
                style="font-style: italic; font-size: 0.9em; color: #795548; margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px;"
            >
                * Map not to scale, only for representation purpose.
            </p>
        </div>

        <div class="step" data-step="2">
            <h2>What does this mean?</h2>
            <p>
                Tamil Nadu currently sends 39 MPs to Lok Sabha whereas Uttar
                Pradesh, with a population almost three times that of Tamil
                Nadu, sends 80.
            </p>

            <figure class="handdrawn-box intro-diagram" style="margin: 30px 0;">
                <img
                    src="/tn-up-comparison.png"
                    alt="Comparison of MP representation in Tamil Nadu and Uttar Pradesh"
                    style="width: 100%; height: auto; display: block;"
                />
                <figcaption
                    style="font-style: italic; text-align: center; margin-top: 15px; color: #5d4037; font-size: 0.95rem;"
                >
                    The growing disparity in representation: A single MP in
                    Uttar Pradesh now represents significantly more citizens
                    than an MP in Tamil Nadu.
                </figcaption>
            </figure>

            <p>
                This means that currently, the 543 seats in the Lok Sabha are
                allocated based on the 1971 census. The 84th Amendment froze
                this allocation until after 2026. For over 50 years, states have
                possessed the exact same political power regardless of their
                population changes to an unprecedented democratic freeze
                designed to incentivize family planning.
            </p>
            <p
                style="font-style: italic; font-size: 0.9em; color: #795548; margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px;"
            >
                Map: Lok Sabha Seats (1971 Census Allocation)
            </p>
        </div>

        <div class="step" data-step="3">
            <h2>The Delimitation Commission</h2>
            <p>
                Redrawing constituencies is done by the <b
                    >Delimitation Commission</b
                >a lengthy, executive-driven process often criticized for
                lacking transparency and citizen participation.
            </p>
            <p>
                If <span class="handdrawn-box"
                    >post-2026<span class="tooltip-text"
                        >The next delimitation is expected to be based on the
                        <a
                            href="https://en.wikipedia.org/wiki/2027_census_of_India"
                            target="_blank"
                            rel="noopener noreferrer"
                            style="color: inherit; text-decoration: underline;"
                            >2027 census of India</a
                        >.</span
                    ></span
                > delimitation relies solely on population, UP could
                gain 10 seats while Tamil Nadu loses 8. This massive power shift
                risks skewing national policies toward more populous North
                Indian states.
            </p>
            <p>
                Furthermore, the 50-year freeze has created a "knowledge
                vacuum." With intellectual discourse on delimitation stagnating
                in India, this lack of understanding poses a serious risk to our
                representative democracy. But why?
            </p>
            <p
                style="font-style: italic; font-size: 0.9em; color: #795548; margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px;"
            >
                Map: Projected Lok Sabha Seats (Post-2026)
            </p>
        </div>

        <div class="step" data-step="4">
            <h2>Post-Delimitation Projection</h2>
            <p>
                From 1971 to 2021, India's population more than doubled from 548
                million to 1.4 billion. But growth was vastly uneven: Kerala's
                population grew by 65%, while Bihar's skyrocketed by nearly
                150%.
            </p>
            <p>
                A strict reallocation based on projected 2026 populations would
                see Uttar Pradesh jumping from 80 to 143 seats (+63), and Bihar
                from 40 to 79 (+39). Conversely, Tamil Nadu would drop from 39
                to 31 (-8) and Kerala from 20 to 12 (-8). The balance of power
                shifts dramatically.
            </p>
            

            <p
                style="font-style: italic; font-size: 0.9em; color: #795548; margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px;"
            >
                Map: Projected Lok Sabha Seats (Post-2026)
            </p>
        </div>
    </div>
    <!-- End of first scrolly-text -->

    <div style="width: 100%; position: relative; z-index: 10;">
        <!-- Ghost step to trigger map fade out early -->
        <div
            class="step"
            data-step="45"
            style="height: 1px; margin-top: -60vh; margin-bottom: 60vh; opacity: 0; pointer-events: none; border: none; box-shadow: none;"
        ></div>

        <div
            class="step"
            data-step="45"
            style="margin: 15vh auto 30vh auto; max-width: 800px; box-sizing: border-box; z-index: 100; background: transparent; border: none; box-shadow: none; padding: 0; transform: none !important; opacity: 1 !important; position: relative;"
        >

            
            <p
                style="font-family: 'Inter', sans-serif; font-size: 1.1rem; line-height: 1.7; color: #333; margin-bottom: 20px; text-align: justify;"
            >
                <span class="handdrawn-box"
                    >Representative democracy<span class="tooltip-text"
                        >A system of government where citizens elect
                        representatives to make laws and policies on their
                        behalf.</span
                    ></span
                > is calculated in terms of the ability to influence the decision
                of the representative (i.e., MP or MLA). When an MP or MLA represents
                a very large population, it becomes difficult for individual citizens
                to have their concerns heard, let alone see them translated into
                concrete actions.
            </p>

            <div
                style="display: flex; gap: 20px; justify-content: center; margin: 30px 0;"
                class="compare-container"
            >
                <img
                    src="/compare-1.png"
                    class="compare-img"
                    alt="Constituency comparison 1"
                    style="max-width: 240px; width: 40%;"
                />
                <img
                    src="/compare-2.png"
                    class="compare-img"
                    alt="Constituency comparison 2"
                    style="max-width: 240px; width: 40%;"
                />
            </div>
            <p
                style="font-style: italic; text-align: center; color: #795548; font-size: 0.95rem; margin-top: -10px; margin-bottom: 30px;"
            >
                These two constituencies have almost the same geographic area
                (~35-40 sq km), but Chandni Chowk has over 12 times the number
                of voters as Daman District!
            </p>

            <p
                style="font-family: 'Inter', sans-serif; font-size: 1.1rem; line-height: 1.7; color: #333; margin-bottom: 0; text-align: justify;"
            >
                The larger the constituency, the harder it is for the MP or MLA
                to effectively engage with citizens, prioritize local issues,
                and ensure meaningful representation. On the other hand, smaller
                constituencies have a greater chance of communicating their
                demands and concerns with their representative. Thus, the
                quality of representative democracy depends on the size of the
                constituency.
            </p>

            <div
                class="notebook-quote stacked-paper"
                style="margin-top: 40px; padding: 20px 25px;"
            >
                <h3
                    style="color: #bf360c; margin-top: 0; font-family: 'Instrument Serif', serif; font-size: 1.8rem; display: flex; align-items: center; gap: 10px;"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path
                            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                        ></path><line x1="12" y1="9" x2="12" y2="13"
                        ></line><line x1="12" y1="17" x2="12.01" y2="17"
                        ></line></svg
                    >
                    Note
                </h3>
                <p
                    style="font-family: 'Inter', sans-serif; font-size: 1.05rem; line-height: 1.6; color: #333; margin-bottom: 0; text-align: justify;"
                >
                    It is imperative to bear in mind the political implications
                    of any delimitation exercise. Delimitation decides which
                    territorial area and its people form a particular
                    constituency. Thus, constituency boundaries can be drawn to
                    advantage a particular political party in the elections.
                </p>
            </div>

            <!-- Absolute positioned Trivia box just like Did You Know -->
            <div
                style="position: absolute; right: -300px; top: 10%; width: 280px; z-index: 10;"
            >
                <div
                    class="notebook-quote stacked-paper"
                    style="padding: 25px 25px; transform: rotate(1.5deg); background: #fdf9f2; box-shadow: 2px 5px 15px rgba(0,0,0,0.1);"
                >
                    <h3
                        style="color: #bf360c; margin-top: 0; font-family: 'Instrument Serif', serif; font-size: 1.8rem;"
                    >
                        Trivia
                    </h3>
                    <p
                        style="font-family: 'Inter', sans-serif; font-size: 1rem; line-height: 1.5; color: #333; margin-bottom: 0;"
                    >
                        India is the world's largest representative democracy,
                        with over 900 million eligible voters participating in
                        its electoral process!
                    </p>
                </div>
            </div>

            <p
                style="font-family: 'Instrument Serif', serif; font-size: 2.5rem; text-align: center; color: #3e2723; margin-top: 60px; margin-bottom: 20px;"
            >
                Did they cross the line?
            </p>

            <div
                style="display: flex; gap: 40px; align-items: flex-start; max-width: 950px; margin: 40px auto; flex-wrap: wrap; justify-content: center;"
            >
                <div
                    style="width: 320px; flex-shrink: 0; text-align: center; cursor: pointer; user-select: none; padding: 20px 15px; margin: 0;"
                    onclick={nextStack}
                    aria-hidden="true"
                    class="notebook-quote stacked-paper"
                >
                    <h3
                        style="font-family: 'Instrument Serif', serif; font-size: 1.6rem; color: #bf360c; margin-bottom: 15px; margin-top: 0; line-height: 1.1; min-height: 40px; display: flex; align-items: center; justify-content: center;"
                    >
                        {stackData[stackIndex].heading}
                    </h3>

                    <div
                        style="width: 100%; position: relative; margin-bottom: 20px;"
                    >
                        <!-- Stack effect shadows underneath removed as per user request -->

                        <div
                            style="position: relative; z-index: 2; width: 100%; background: transparent;"
                        >
                            <img
                                src={stackData[stackIndex].img}
                                alt={stackData[stackIndex].heading}
                                style="width: 100%; height: auto; display: block; mix-blend-mode: multiply; border-radius: 8px; pointer-events: none;"
                            />
                        </div>
                    </div>

                    <div
                        style="min-height: 90px; display: flex; align-items: flex-start; justify-content: center;"
                    >
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1rem; line-height: 1.4; color: #b71c1c; font-weight: 500; margin: 0;"
                        >
                            {stackData[stackIndex].caption}
                        </p>
                    </div>

                    <div
                        style="display: flex; gap: 8px; justify-content: center; margin-top: 10px;"
                    >
                        {#each stackData as _, i}
                            <div
                                style="width: 10px; height: 10px; border-radius: 50%; background: {i ===
                                stackIndex
                                    ? '#bf360c'
                                    : '#d7ccc8'}; transition: background 0.3s ease;"
                            ></div>
                        {/each}
                    </div>
                </div>

                <div style="flex: 1; min-width: 300px;">
                    <p
                        style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; text-align: left; margin-top: 0; margin-bottom: 20px;"
                    >
                        Suppose a political party is in power in a State.
                        Traditionally, it happens to gain more votes/supporters
                        in rural areas. Constituencies were redrawn in a way
                        that more villages were merged with adjoining rural
                        areas. This provided an electoral advantage to the party
                        in the next election! The political party that knows the
                        demography of the state is best placed to gain from
                        delimitation this change from rural to urban was used by
                        parties for electoral gains.
                    </p>
                    <p
                        style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; text-align: left; margin-bottom: 0;"
                    >
                        A process that has practical bearing on the democracy
                        and political representation of the people in the
                        Parliament should be done in a fair and transparent
                        manner. However, not much information is available on
                        the process that is followed for the Delimitation of
                        Parliamentary and Assembly constituencies in India. This
                        will ensure that the delimitation of electoral
                        constituencies does not become a purely political
                        exercise which is vulnerable to being used by any
                        political party to its own advantage, particularly to
                        gain favourable electoral outcomes.
                    </p>
                </div>
            </div>
        </div>

        <div
            class="step"
            data-step="46"
            style="margin: 15vh auto; max-width: 1150px; box-sizing: border-box; z-index: 100; background: transparent; border: none; box-shadow: none; padding: 0; transform: none !important; opacity: 1 !important;"
        >
            <h2
                style="font-family: 'Instrument Serif', serif; font-size: 2.5rem; color: #b71c1c; margin-bottom: 30px; text-align: left;"
            >
                How is the Delimitation exercise carried out in India?
            </h2>

            <p
                style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 25px; text-align: left;"
            >
                Even after so many years, the process of delimitation of
                electoral constituencies from the start to end has remained
                notably opaque. This is because the Constitution delineates only
                the overarching principles that must be considered during the
                delimitation process, while the detailed procedures for carrying
                out the delimitation exercise are articulated in the
                delimitation law enacted by Parliament before each delimitation
                exercise.
            </p>

            <p
                style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 25px; text-align: left;"
            >
                Given that the moratorium imposed on delimitation of
                parliamentary constituencies in India will come to an end in
                2026, it is important to understand the procedure that the next
                delimitation exercise might follow.
            </p>

            <p
                style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 40px; text-align: left;"
            >
                Towards this end, we attempted to study the process followed by
                the Delimitation Commission in the last delimitation exercise
                (2002-2008). Based on the available information, we have
                conducted a mapping exercise to understand the stages involved
                in the delimitation process and the stakeholders involved at
                each stage.
            </p>

            <div
                style="display: flex; gap: 150px; align-items: flex-start; position: relative; margin-top: 40px;"
            >
                <div
                    style="flex: 1.2; position: sticky; top: 25vh; z-index: 10; padding: 20px 0; background: transparent; aspect-ratio: 1.7; min-width: 0; order: 2;"
                >
                    <svg
                        viewBox="0 0 700 400"
                        style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; overflow: visible;"
                    >
                        <defs>
                            <filter id="handdrawn-circle" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                            </filter>
                        </defs>
                        <!-- Thick hand-drawn style dashed line, using inline style to override any global CSS path fills -->
                        <path
                            d="M 50 270 C 110 130, 150 60, 210 60 C 290 60, 320 225, 380 225 C 430 225, 470 135, 520 135 C 570 135, 590 30, 630 30"
                            style="fill: transparent !important;"
                            stroke="#444"
                            stroke-width="4"
                            stroke-dasharray="14, 10"
                            stroke-linecap="round"
                        />

                        <g
                            style="transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);"
                            opacity="1"
                            transform-origin="50 270"
                            transform={activeProcess === 1
                                ? "scale(1.6)"
                                : "scale(1)"}
                        >
                            <circle
                                cx="50"
                                cy="270"
                                r="18"
                                style="fill: {activeProcess === 1 ? '#bf360c' : '#d32f2f'} !important; transition: fill 0.3s;"
                                filter="url(#handdrawn-circle)"
                            />
                            <text
                                x="50"
                                y="276"
                                text-anchor="middle"
                                fill="#fff"
                                font-size={activeProcess === 1 ? "22" : "16"}
                                font-family="'Instrument Serif', serif"
                                font-weight="bold">1</text
                            >
                        </g>
                        <g
                            style="transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);"
                            opacity="1"
                            transform-origin="210 60"
                            transform={activeProcess === 2
                                ? "scale(1.6)"
                                : "scale(1)"}
                        >
                            <circle
                                cx="210"
                                cy="60"
                                r="18"
                                style="fill: {activeProcess === 2 ? '#bf360c' : '#d32f2f'} !important; transition: fill 0.3s;"
                                filter="url(#handdrawn-circle)"
                            />
                            <text
                                x="210"
                                y="66"
                                text-anchor="middle"
                                fill="#fff"
                                font-size={activeProcess === 2 ? "22" : "16"}
                                font-family="'Instrument Serif', serif"
                                font-weight="bold">2</text
                            >
                        </g>
                        <g
                            style="transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);"
                            opacity="1"
                            transform-origin="380 225"
                            transform={activeProcess === 3
                                ? "scale(1.6)"
                                : "scale(1)"}
                        >
                            <circle
                                cx="380"
                                cy="225"
                                r="18"
                                style="fill: {activeProcess === 3 ? '#bf360c' : '#d32f2f'} !important; transition: fill 0.3s;"
                                filter="url(#handdrawn-circle)"
                            />
                            <text
                                x="380"
                                y="231"
                                text-anchor="middle"
                                fill="#fff"
                                font-size={activeProcess === 3 ? "22" : "16"}
                                font-family="'Instrument Serif', serif"
                                font-weight="bold">3</text
                            >
                        </g>
                        <g
                            style="transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);"
                            opacity="1"
                            transform-origin="520 135"
                            transform={activeProcess === 4
                                ? "scale(1.6)"
                                : "scale(1)"}
                        >
                            <circle
                                cx="520"
                                cy="135"
                                r="18"
                                style="fill: {activeProcess === 4 ? '#bf360c' : '#d32f2f'} !important; transition: fill 0.3s;"
                                filter="url(#handdrawn-circle)"
                            />
                            <text
                                x="520"
                                y="141"
                                text-anchor="middle"
                                fill="#fff"
                                font-size={activeProcess === 4 ? "22" : "16"}
                                font-family="'Instrument Serif', serif"
                                font-weight="bold">4</text
                            >
                        </g>
                        <g
                            style="transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);"
                            opacity="1"
                            transform-origin="630 30"
                            transform={activeProcess === 5
                                ? "scale(1.6)"
                                : "scale(1)"}
                        >
                            <circle
                                cx="630"
                                cy="30"
                                r="18"
                                style="fill: {activeProcess === 5 ? '#bf360c' : '#d32f2f'} !important; transition: fill 0.3s;"
                                filter="url(#handdrawn-circle)"
                            />
                            <text
                                x="630"
                                y="36"
                                text-anchor="middle"
                                fill="#fff"
                                font-size={activeProcess === 5 ? "22" : "16"}
                                font-family="'Instrument Serif', serif"
                                font-weight="bold">5</text
                            >
                        </g>
                    </svg>

                    <div
                        style="position: absolute; left: 5%; top: 94%; transform: translate(-50%, -50%) {activeProcess ===
                        1
                            ? 'scale(1.1)'
                            : 'scale(1)'}; border: 2px solid #d32f2f; border-radius: 255px 15px 225px 15px/15px 225px 15px 255px; padding: 4px 8px; color: #d32f2f; font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: bold; text-align: center; pointer-events: none; transition: transform 0.3s; background: rgba(255, 255, 255, 0.9);"
                    >
                        CONDUCT OF CENSUS
                    </div>
                    <div
                        style="position: absolute; left: 27%; top: 10%; transform: translate(-50%, -50%) {activeProcess ===
                        2
                            ? 'scale(1.1)'
                            : 'scale(1)'}; border: 2px solid #d32f2f; border-radius: 15px 255px 15px 225px/255px 15px 225px 15px; padding: 4px 8px; color: #d32f2f; font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: bold; text-align: center; pointer-events: none; transition: transform 0.3s; background: rgba(255, 255, 255, 0.9);"
                    >
                        PUBLICATION OF RELEVANT<br />POPULATION DATA
                    </div>
                    <div
                        style="position: absolute; left: 50%; top: 88%; transform: translate(-50%, -50%) {activeProcess ===
                        3
                            ? 'scale(1.1)'
                            : 'scale(1)'}; border: 2px solid #d32f2f; border-radius: 225px 15px 255px 15px/15px 255px 15px 225px; padding: 4px 8px; color: #d32f2f; font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: bold; text-align: center; pointer-events: none; transition: transform 0.3s; background: rgba(255, 255, 255, 0.9);"
                    >
                        DRAFTING OF<br />WORKING<br />PAPERS
                    </div>
                    <div
                        style="position: absolute; left: 68%; top: 25%; transform: translate(-50%, -50%) {activeProcess ===
                        4
                            ? 'scale(1.1)'
                            : 'scale(1)'}; border: 2px solid #d32f2f; border-radius: 255px 25px 225px 15px/15px 225px 15px 255px; padding: 4px 8px; color: #d32f2f; font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: bold; text-align: center; pointer-events: none; transition: transform 0.3s; background: rgba(255, 255, 255, 0.9);"
                    >
                        RELEASE OF<br />DRAFT PROPOSAL
                    </div>
                    <div
                        style="position: absolute; left: 82%; top: -2%; transform: translate(-50%, -50%) {activeProcess ===
                        5
                            ? 'scale(1.1)'
                            : 'scale(1)'}; border: 2px solid #d32f2f; border-radius: 15px 225px 15px 255px/225px 15px 255px 15px; padding: 4px 8px; color: #d32f2f; font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: bold; text-align: center; pointer-events: none; transition: transform 0.3s; background: rgba(255, 255, 255, 0.9);"
                    >
                        PUBLICATION OF<br />DELIMITATION ORDER
                    </div>
                </div>

                <div
                    style="flex: 1.1; margin-top: 10vh; padding-bottom: 20vh; min-width: 400px; order: 1;"
                >
                    <div
                        class="process-trigger notebook-quote"
                        data-process="1"
                        style="max-width: 100%; padding: 30px 40px; min-height: 180px; margin: 0 0 40vh 0; opacity: {activeProcess ===
                        1
                            ? 1
                            : 0.3}; transition: opacity 0.4s;"
                    >
                        <h3
                            style="font-family: 'Instrument Serif', serif; font-size: 2rem; color: #3e2723; font-style: italic; margin-top: 0; margin-bottom: 15px; text-align: left;"
                        >
                            1. Conduct of Census
                        </h3>
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 0; text-align: left;"
                        >
                            Delimitations around the world are prompted by
                            either the passage of a specified time period or a
                            periodic event. Under the Constitution of India,
                            delimitation is prompted by a periodic event - the
                            Population Census. Before any delimitation can
                            occur, a fresh census must be conducted to gather
                            accurate and updated population data across all
                            states and constituencies. <span
                                class="handdrawn-box"
                                >Article 82<span class="tooltip-text"
                                    >Article 82 provides for the readjustment of
                                    Lok Sabha seats and territorial
                                    constituencies to the States after every
                                    census.</span
                                ></span
                            > of the Constitution of India mandates the conduct of
                            a delimitation exercise after every census.
                        </p>
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 20px 0 0 0; text-align: left;"
                        >
                            After the completion of the Census, the Parliament
                            enacts a Delimitation Act for the purposes of
                            redrawing the boundaries of electoral constituencies
                            of the Parliament and of the State Assemblies.
                        </p>
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 20px 0 30px 0; text-align: left;"
                        >
                            This new Delimitation Act repeals the
                            existing/former Act on Delimitation. For instance,
                            the Delimitation Act 1971 has repealed the
                            Delimitation Act of 1961.
                        </p>
                        <table
                            style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 1rem; color: #333; text-align: left; background: #fff; margin-top: 20px;"
                        >
                            <thead>
                                <tr>
                                    <th
                                        style="background-color: #d32f2f; color: #fff; padding: 12px; border: 2px solid #333; font-weight: bold; text-align: center;"
                                        >STAGE</th
                                    >
                                    <th
                                        style="background-color: #d32f2f; color: #fff; padding: 12px; border: 2px solid #333; font-weight: bold; text-align: center;"
                                        >STAKEHOLDERS INVOLVED</th
                                    >
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >Completion of the Population Census
                                        based on the Census Act, 1948 and the
                                        Census Rules, 1990</td
                                    >
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >The Office of the Registrar General and
                                        Census Commissioner, Ministry of Home
                                        Affairs</td
                                    >
                                </tr>
                                <tr>
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >The Delimitation Act is drafted</td
                                    >
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >MPs and bureaucrats</td
                                    >
                                </tr>
                                <tr>
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >The Delimitation Act is passed in the
                                        Parliament.</td
                                    >
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >MPs + President of India</td
                                    >
                                </tr>
                                <tr>
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >Repeal of the older delimitation Act</td
                                    >
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >Parliament</td
                                    >
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div
                        class="process-trigger notebook-quote"
                        data-process="2"
                        style="max-width: 100%; padding: 30px 40px; min-height: 180px; margin: 0 0 40vh 0; opacity: {activeProcess ===
                        2
                            ? 1
                            : 0.3}; transition: opacity 0.4s;"
                    >
                        <h3
                            style="font-family: 'Instrument Serif', serif; font-size: 2rem; color: #3e2723; font-style: italic; margin-top: 0; margin-bottom: 15px; text-align: left;"
                        >
                            2. Publication of Relevant Population Data
                        </h3>
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 0; text-align: left;"
                        >
                            The official census figures are published by the
                            government. This data provides the demographic
                            bedrock upon which new constituency boundaries will
                            be calculated.
                        </p>
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 20px 0 0 0; text-align: left;"
                        >
                            The Constitution empowers the Parliament to decide the manner in which the delimitation exercise is to be carried out as well as the authority that should carry out the exercise. In India, the Delimitation Act entrusts the task of drawing the Parliamentary and Assembly constituencies to an independent authority. This authority is known as the Delimitation Commission (DC). After the enactment of the Delimitation Act, a new DC is constituted. The DC is constituted by the Union Government. The last DC was appointed in 2002 with the following core members: Present or a former Supreme Court judge as the Chairperson, The Chief Election Commissioner (or his/her nominee) and the State Election Commissioner (or his/her nominee), as members.
                        </p>
                        <table
                            style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 1rem; color: #333; text-align: left; background: #fff; margin-top: 20px;"
                        >
                            <thead>
                                <tr>
                                    <th
                                        style="background-color: #d32f2f; color: #fff; padding: 12px; border: 2px solid #333; font-weight: bold; text-align: center;"
                                        >STAGE / EVENT</th
                                    >
                                    <th
                                        style="background-color: #d32f2f; color: #fff; padding: 12px; border: 2px solid #333; font-weight: bold; text-align: center;"
                                        >STAKEHOLDERS INVOLVED</th
                                    >
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >Delimitation Commission is constituted</td
                                    >
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >Central Government</td
                                    >
                                </tr>
                                <tr>
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >Delimitation Commission commences its work</td
                                    >
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >Central government, Election Commission of India (ECI), SECs, Governor, and Nagaland, Speakers of Lok Sabha</td
                                    >
                                </tr>
                                <tr>
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >Nomination of Associate Members (AMs)</td
                                    >
                                    <td
                                        style="padding: 12px; border: 2px solid #333;"
                                        >MPs, MLAs, Speakers of LS and State Legislative Assemblies, political parties, and CEC</td
                                    >
                                </tr>
                            </tbody>
                        </table>
                        <p
                            style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 20px 0 0 0; text-align: left;"
                        >
                            In addition to its core membership, Delimitation Acts have allowed the DC to associate itself with certain MPs from each State and MLAs from each State. For instance, the 2002 Delimitation Act required the Speaker of the Lok Sabha to nominate 5 MPs from every State within two months and the nomination of 5 MLAs by the Speaker of the respective State Assembly within one month of the composition of the DC. The nomination has to be communicated to the CEC as well.
                        </p>
                    </div>

                    <div
                        class="process-trigger notebook-quote"
                        data-process="3"
                        style="max-width: 100%; padding: 30px 40px; min-height: 180px; margin: 0 0 40vh 0; opacity: {activeProcess ===
                        3
                            ? 1
                            : 0.3}; transition: opacity 0.4s;"
                    >
                        <h3
                            style="font-family: 'Instrument Serif', serif; font-size: 2rem; color: #3e2723; font-style: italic; margin-top: 0; margin-bottom: 15px; text-align: left;"
                        >
                            3. Drafting of Working Papers
                        </h3>
                        <p style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 0; text-align: left;">
                            The next stage involves the preparation of Working Papers by the DC. The DC initially prepares working papers on the following:
                        </p>
                        <ul style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 10px 0 20px 0; padding-left: 20px; text-align: left;">
                            <li><strong>Paper I:</strong> District-wise population data and entitlement of assembly seats for each district</li>
                            <li><strong>Paper II:</strong> Entitlement of seats for Scheduled Castes (SC) in the assembly and distribution of SC seats among the districts</li>
                        </ul>
                        <p style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 20px 0 0 0; text-align: left;">
                            Soon after Papers I and II are prepared by the DC’s office, the same is submitted to the Chairperson of the Delimitation Commission, Election Commission of India (ECI) and the State Election Commission (SEC) of that State. Thereafter, a meeting of the full Commission follows to tentatively approve these Papers I and II. The AMs are first consulted at this stage. There has been little to no guidance in Delimitation Acts on considerations that direct the nomination of AMs by respective Speakers. The absence of any guidance could lead to concentration of AMs from any one political party, costing the DC adequate representation from across parties. Moreover, the AMs do not have the right to vote or sign any decision of the Commission.
                        </p>
                        <ul style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 20px 0 20px 0; padding-left: 20px; text-align: left;">
                            <li><strong>Paper III:</strong> SC population in the proposed assembly constituencies and seats proposed to be reserved for SC</li>
                            <li><strong>Paper IV:</strong> Scheduled Tribes (ST) population in the proposed assembly constituencies and seats proposed to be reserved for ST</li>
                            <li><strong>Paper V:</strong> Abstract statement of proposed assembly constituencies and total, SC and ST population in each constituency</li>
                            <li><strong>Paper VI:</strong> District-wise statement showing details of extent, total/SC/ST population in each of the proposed assembly constituencies</li>
                            <li><strong>Paper VII:</strong> Proposed Lok Sabha constituencies and their extent in terms of proposed assembly constituencies</li>
                        </ul>
                        <p style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 20px 0 0 0; text-align: left;">
                            The working papers are again submitted to the DC for tentative approval after taking into consideration the suggestions of the AMs. At this stage, all tentatively approved working papers are disseminated to the AMs, accompanied by supplementary data and maps. AMs are allotted adequate time to review the proposals and formulate their suggestions. Subsequently, the DC convenes for the second set of meetings with the AMs. The DC evaluates the suggestions of the AMs on the Working Papers, after which the draft proposals of the Commission are formulated.
                        </p>
                        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 1rem; color: #333; text-align: left; background: #fff; margin-top: 20px;">
                            <thead>
                                <tr>
                                    <th style="background-color: #d32f2f; color: #fff; padding: 12px; border: 2px solid #333; font-weight: bold; text-align: center;">STAGE</th>
                                    <th style="background-color: #d32f2f; color: #fff; padding: 12px; border: 2px solid #333; font-weight: bold; text-align: center;">STAKEHOLDERS INVOLVED</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">Delimitation Commission prepares working papers.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">Members of the Delimitation Commission + members of the DC’s office</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">Papers I and II tentatively approved by DC. AMs will be consulted for the first time.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">Members of the DC + DC’s office + AMs</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">Papers III to VII tentatively approved by the DC. AMs are consulted.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">Members of the DC + DC’s office + AMs</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">Copies of all Working Papers disseminated to the AMs accompanied by supplementary data and maps.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">Members of the DC + DC’s office + AMs + The Chief Election Officer of the concerned State</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">AMs are given a reasonable time to study the proposals and formulate their suggestions.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">AMs</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">The second round of meeting(s) of the Commission with the AMs.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">Members of the DC + DC’s office + AMs</td>
                                </tr>
                            </tbody>
                        </table>
                        <div
                            style="background-color: #d32f2f; color: #fff; padding: 20px; border-radius: 8px; margin-top: 30px; font-family: 'Inter', sans-serif;"
                        >
                            <h4 style="margin-top: 0; font-size: 1.25rem; margin-bottom: 15px;">Who all constitute the office of the DC?</h4>
                            <ul style="margin: 0; padding-left: 20px; line-height: 1.6; font-size: 1.05rem;">
                                <li>Deputy Election Commissioner (head);</li>
                                <li>One of the ECI Secretaries (who is notified as ex-officio Secretary of the DC);</li>
                                <li>Any expert in geographical information system; and</li>
                                <li>Four Under Secretaries and around 20 supporting staff are drawn from the ECI.</li>
                            </ul>
                        </div>
                    </div>

                    <div
                        class="process-trigger notebook-quote"
                        data-process="4"
                        style="max-width: 100%; padding: 30px 40px; min-height: 180px; margin: 0 0 40vh 0; opacity: {activeProcess ===
                        4
                            ? 1
                            : 0.3}; transition: opacity 0.4s;"
                    >
                        <h3
                            style="font-family: 'Instrument Serif', serif; font-size: 2rem; color: #3e2723; font-style: italic; margin-top: 0; margin-bottom: 15px; text-align: left;"
                        >
                            4. Release of Draft Proposal
                        </h3>
                        <p style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 0; text-align: left;">
                            At this stage, the Delimitation draft proposal is developed by the Delimitation Commission, incorporating the recommendations of the AMs. A copy of the draft proposal is subsequently sent to each AM. The AMs may submit their objections to any section of the draft proposal at this time as a dissent note.
                        </p>
                        <h4 style="font-family: 'Instrument Serif', serif; font-size: 1.5rem; color: #3e2723; margin-top: 30px; margin-bottom: 10px; text-align: left;">
                            Concluding Steps
                        </h4>
                        <p style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 0; text-align: left;">
                            Subsequently, the DC publishes the draft delimitation plan in the Gazette of India and in the Official Gazettes of all relevant States. The dissenting remarks of the AMs are published solely at the request of the AM.
                        </p>
                        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 1rem; color: #333; text-align: left; background: #fff; margin-top: 20px;">
                            <thead>
                                <tr>
                                    <th style="background-color: #d32f2f; color: #fff; padding: 12px; border: 2px solid #333; font-weight: bold; text-align: center;">STAGE</th>
                                    <th style="background-color: #d32f2f; color: #fff; padding: 12px; border: 2px solid #333; font-weight: bold; text-align: center;">STAKEHOLDERS INVOLVED</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">A Delimitation draft Proposal is prepared by the DC.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">Members of the DC + DC’s office + AMs + ECI</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">A copy of the draft proposals is sent to each of the AMs.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">Members of the DC + DC’s office + AMs</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">The AMs may send back dissenting notes in respect of any of the draft proposals.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">DC + AMs</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">DC will publish the draft proposal together with the dissent note in the Gazette of India and in the Official Gazettes of all relevant States.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">DC</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div
                        class="process-trigger notebook-quote"
                        data-process="5"
                        style="max-width: 100%; padding: 30px 40px; min-height: 180px; margin: 0 0 40vh 0; opacity: {activeProcess ===
                        5
                            ? 1
                            : 0.3}; transition: opacity 0.4s;"
                    >
                        <h3
                            style="font-family: 'Instrument Serif', serif; font-size: 2rem; color: #3e2723; font-style: italic; margin-top: 0; margin-bottom: 15px; text-align: left;"
                        >
                            5. Concluding Steps & Publication
                        </h3>
                        <p style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin: 0; text-align: left;">
                            The delimitation plan is opened up to the public and their opinions and views are solicited through one or more public sittings. The final delimitation plan/order is published in the official gazette and in at least two vernacular newspapers. This is also publicised on radio, television and other possible media available to the public. The Delimitation Commission becomes inoperative after the final Delimitation Order is published.
                        </p>
                        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 1rem; color: #333; text-align: left; background: #fff; margin-top: 20px;">
                            <thead>
                                <tr>
                                    <th style="background-color: #d32f2f; color: #fff; padding: 12px; border: 2px solid #333; font-weight: bold; text-align: center;">STAGE</th>
                                    <th style="background-color: #d32f2f; color: #fff; padding: 12px; border: 2px solid #333; font-weight: bold; text-align: center;">STAKEHOLDERS INVOLVED</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">Public opinion and views are solicited on the Delimitation Plan</td>
                                    <td style="padding: 12px; border: 2px solid #333;">Citizens, DC</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">All objections and suggestions which may have been received are considered by the DC before the date so specified.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">DC, State Governments, participants in public consultations</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">Thereafter by one or more orders (i) the delimitation of parliamentary constituencies; and (ii) the delimitation of assembly constituencies, is determined for each state.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">DC</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; border: 2px solid #333;">After such publication, every such order shall be laid before the House of the People and the Legislative Assemblies of the State concerned.</td>
                                    <td style="padding: 12px; border: 2px solid #333;">MPs and MLAs</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div
                class="notebook-quote"
                style="max-width: 100%; padding: 40px; margin: 40px 0 10vh 0; background: #fffdf8;"
            >
                <h3
                    style="font-family: 'Inter', sans-serif; font-size: 1.5rem; color: #d32f2f; margin-top: 0; margin-bottom: 15px; text-align: left; font-weight: bold;"
                >
                    V. Key Takeaways
                </h3>
                <p style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 20px; text-align: left;">
                    The delimitation process mapping exercise highlighted some concerns around the current process being followed:
                </p>
                
                <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
                    <div style="background-color: #d32f2f; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; font-weight: bold; margin-right: 15px; flex-shrink: 0; margin-top: 3px;">1</div>
                    <div style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; text-align: left;">
                        As you can notice, delimitation is an extremely lengthy process which can become time-consuming. For instance, the 2008 delimitation took 6 years and 4 months to come out with the final delimitation order. Since the clock is already ticking, it is imperative that we start with the process at the earliest.
                    </div>
                </div>

                <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
                    <div style="background-color: #d32f2f; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; font-weight: bold; margin-right: 15px; flex-shrink: 0; margin-top: 3px;">2</div>
                    <div style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; text-align: left;">
                        The Delimitation process is a completely executive-driven process with the power of delimiting constituencies being with governmental institutions such as the Parliament, the ECI, the DC and the Speakers.
                    </div>
                </div>

                <div style="display: flex; align-items: flex-start;">
                    <div style="background-color: #d32f2f; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; font-weight: bold; margin-right: 15px; flex-shrink: 0; margin-top: 3px;">3</div>
                    <div style="font-family: 'Inter', sans-serif; font-size: 1.15rem; line-height: 1.8; color: #333; text-align: left;">
                        The lack of transparency within the delimitation process is of concern as it undermines both citizen participation and expert engagement. Since this complex process needs to be understood carefully and researched closely, institutional spaces for collaboration need to be provided.
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End of full-width centered container -->


    <div class="scrolly-text" style="margin-top: 0; z-index: 10;">
        <div class="step" data-step="5" data-color="Population">
            <h2>The Representation Gap</h2>
            
            <p style="font-family: 'Instrument Serif', serif; font-size: 1.8rem; color: #b71c1c; font-style: italic; border-left: 4px solid #b71c1c; padding: 15px 20px; margin: 20px 0; background: #fffdf8;">
                &ldquo;One person, one vote, one value.&rdquo;<br>
                <span style="font-family: 'Inter', sans-serif; font-size: 0.95rem; color: #555; font-style: normal; display: block; margin-top: 10px;">— Union Home Minister Amit Shah, defending the need for delimitation.</span>
            </p>

            <p>
                The freeze on Lok Sabha seats since the 1971 Census has produced striking disparities in representation. While constituency boundaries have continued to be redrawn, the allocation of seats among states has remained unchanged. As populations diverged, so did the number of citizens represented by each MP.
            </p>
            <p>
                Today, an MP from Tamil Nadu represents roughly 18 lakh people, while an MP from Uttar Pradesh represents around 25 lakh. In practice, this means legislators from larger constituencies face greater demands on constituency services, public outreach, and local issue resolution.
            </p>
            <p>
                The question facing the Delimitation Commission is whether electoral equality should now outweigh the political compromises made to encourage population control five decades ago.
            </p>
            
            <div style="margin: 30px 0; background: transparent;">
                <svg viewBox="0 0 800 560" style="width: 100%; height: auto; font-family: 'Inter', sans-serif;">
                    <!-- Headers -->
                    {#each regions as region}
                        {@const seg0 = getSegment(0, region.id)}
                        {@const words = region.label.split(' ')}
                        <text x={seg0.x + seg0.w/2} y="30" style="font-size: 24px; font-weight: bold;" fill="#333" text-anchor="middle">
                            <tspan x={seg0.x + seg0.w/2} dy="0">{words[0]}</tspan>
                            {#if words.length > 1}
                                <tspan x={seg0.x + seg0.w/2} dy="26">{words.slice(1).join(' ')}</tspan>
                            {/if}
                        </text>
                    {/each}

                    {#each vizRows as row, i}
                        {@const y = 100 + i * 160}
                        
                        <!-- Row Label -->
                        <text x="300" y={y + 50} style="font-size: 22px;" fill="#555" text-anchor="end">{row.label}</text>

                        <!-- Bars -->
                        {#each regions as region}
                            {@const seg = getSegment(i, region.id)}
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <!-- svelte-ignore a11y_mouse_events_have_key_events -->
                            <rect 
                                x={seg.x} 
                                y={y} 
                                width={seg.w} 
                                height="80" 
                                fill={region.color} 
                                opacity={hoveredRegion && hoveredRegion !== region.id ? 0.3 : 1}
                                style="transition: opacity 0.3s; cursor: pointer;"
                                onmouseenter={() => hoveredRegion = region.id}
                                onmouseleave={() => hoveredRegion = null}
                            />
                            <!-- Value Text -->
                            <text 
                                x={seg.x + seg.w/2} 
                                y={y + 52} 
                                style="font-size: 28px; font-weight: bold; transition: opacity 0.3s; pointer-events: none;"
                                fill={region.id === 'other' ? '#555' : '#fff'} 
                                text-anchor="middle"
                                opacity={hoveredRegion && hoveredRegion !== region.id ? 0.3 : 1}
                            >{seg.val}%</text>
                        {/each}

                        <!-- Polygons linking to next row -->
                        {#if i < vizRows.length - 1}
                            {#each regions as region}
                                {@const topSeg = getSegment(i, region.id)}
                                {@const botSeg = getSegment(i + 1, region.id)}
                                <!-- svelte-ignore a11y_no_static_element_interactions -->
                                <!-- svelte-ignore a11y_mouse_events_have_key_events -->
                                <polygon 
                                    points="{topSeg.x},{y + 80} {topSeg.x + topSeg.w},{y + 80} {botSeg.x + botSeg.w},{y + 160} {botSeg.x},{y + 160}"
                                    fill={region.color}
                                    opacity={hoveredRegion === region.id ? 0.6 : (hoveredRegion ? 0.1 : 0.25)}
                                    style="transition: opacity 0.3s; cursor: pointer;"
                                    onmouseenter={() => hoveredRegion = region.id}
                                    onmouseleave={() => hoveredRegion = null}
                                />
                            {/each}
                        {/if}
                    {/each}
                </svg>
                <p style="text-align: center; font-size: 1.25rem; color: #666; margin-top: 15px; font-style: italic;">Hover over the regions to trace their demographic shifts.</p>
            </div>
            <div style="margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px; color: #795548;">
                <p style="font-style: italic; font-size: 0.9em; margin: 0;">Map: Population Distribution (2011 Census)</p>
                <p style="font-size: 0.8em; font-weight: normal; margin: 5px 0 0 0; line-height: 1.4;">
                    <sup>1</sup> <a href="https://timesofindia.indiatimes.com/india/delimitation-needed-to-preserve-one-vote-one-value-amit-shah-in-lok-sabha/articleshow/130345375.cms" target="_blank" style="color: inherit; text-decoration: none; word-break: break-all; font-weight: normal;">https://timesofindia.indiatimes.com/india/delimitation-needed-to-preserve-one-vote-one-value-amit-shah-in-lok-sabha/articleshow/130345375.cms</a>
                </p>
            </div>
        </div>

        <div class="step" data-step="6" data-color="FertilityRate">
            <h2>The Role of Fertility</h2>
            
            <p style="font-family: 'Instrument Serif', serif; font-size: 1.8rem; color: #b71c1c; font-style: italic; border-left: 4px solid #b71c1c; padding: 15px 20px; margin: 20px 0; background: #fffdf8;">
                &ldquo;States that controlled their population should not be penalised.&rdquo;<br>
                <span style="font-family: 'Inter', sans-serif; font-size: 0.95rem; color: #555; font-style: normal; display: block; margin-top: 10px;">— M.K. Stalin, Chief Minister of Tamil Nadu.</span>
            </p>

            <p>
                The roots of today's debate lie in India's demographic transition. Southern states achieved replacement-level fertility decades ago through investments in public health, female education, and family planning. Northern states experienced a slower demographic transition and continue to record higher fertility rates.
            </p>
            <p>
                According to NFHS-5, Bihar's Total Fertility Rate is 2.98, the highest in India, while Kerala (1.7) and Tamil Nadu (1.8) remain well below the replacement level of 2.1.
            </p>
            <p>
                If parliamentary representation is redistributed purely on current population, states that met national family planning goals earliest fear losing relative political influence because their populations grew more slowly.
            </p>
            <div style="margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px; color: #795548;">
                <p style="font-style: italic; font-size: 0.9em; margin: 0;">Map: Total Fertility Rate (TFR)</p>
                <p style="font-size: 0.8em; font-weight: normal; margin: 5px 0 0 0; line-height: 1.4;">
                    <sup>2</sup> <a href="https://www.reuters.com/world/india/north-vs-south-india-what-is-delimitation-why-its-controversial-2025-03-14/" target="_blank" style="color: inherit; text-decoration: none; word-break: break-all; font-weight: normal;">https://www.reuters.com/world/india/north-vs-south-india-what-is-delimitation-why-its-controversial-2025-03-14/</a>
                </p>
            </div>
        </div>

        <div class="step" data-step="7" data-color="GDPPerCapita">
            <h2>Economic Disconnect</h2>
            <p>
                The delimitation debate is no longer only about population—it is increasingly about economics.
            </p>
            <p>
                The five southern states together account for around one-third of India's Gross State Domestic Product despite comprising roughly one-fifth of the national population. Tamil Nadu alone ranks among India's largest manufacturing economies, while Karnataka dominates technology exports and Telangana has emerged as a pharmaceutical hub.
            </p>
            <p>
                This has prompted several economists to ask whether economic contribution and political representation are beginning to move in opposite directions.
            </p>
            <p>
                As The Hindu observed, the issue is not merely about parliamentary seats but about preserving the balance between India's demographic and economic realities.
            </p>
            <p style="font-style: italic; font-size: 0.9em; color: #795548; margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px;">
                Map: GDP Per Capita (INR)
            </p>
        </div>

        <div class="step" data-step="8" data-color="TaxContribution">
            <h2>Tax Contribution</h2>
            
            <p style="font-family: 'Instrument Serif', serif; font-size: 1.8rem; color: #b71c1c; font-style: italic; border-left: 4px solid #b71c1c; padding: 15px 20px; margin: 20px 0; background: #fffdf8;">
                &ldquo;We contribute more, but our voice may become smaller.&rdquo;<br>
                <span style="font-family: 'Inter', sans-serif; font-size: 0.95rem; color: #555; font-style: normal; display: block; margin-top: 10px;">— A recurring concern raised by several southern Chief Ministers.</span>
            </p>

            <p>
                Fiscal federalism has become closely linked to the delimitation debate.
            </p>
            <p>
                According to Finance Commission data, wealthier states contribute a disproportionately larger share of direct and indirect taxes to the Union. These revenues are then redistributed using formulas that prioritize income gaps, population, and development needs.
            </p>
            <p>
                Studies frequently cited in public debate estimate that for every ₹100 contributed, Karnataka receives roughly ₹15, while states such as Uttar Pradesh and Bihar receive several times their own contribution through transfers. Although redistribution remains a constitutional objective, southern states argue that a simultaneous reduction in their parliamentary influence would weaken their ability to shape future fiscal policy.
            </p>
            <div style="margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px; color: #795548;">
                <p style="font-style: italic; font-size: 0.9em; margin: 0;">Map: Central Tax Contribution vs Return</p>
                <p style="font-size: 0.8em; font-weight: normal; margin: 5px 0 0 0; line-height: 1.4;">
                    <sup>3</sup> <a href="https://www.reuters.com/world/india/indias-north-south-divide-over-modis-plan-redraw-constituencies-2025-03-04/" target="_blank" style="color: inherit; text-decoration: none; word-break: break-all; font-weight: normal;">https://www.reuters.com/world/india/indias-north-south-divide-over-modis-plan-redraw-constituencies-2025-03-04/</a>
                </p>
            </div>
        </div>

        <div class="step" data-step="9" data-color="Literacy">
            <h2>Development Outcomes</h2>
            <p>
                India's demographic divide is also reflected in human development indicators.
            </p>
            <p>
                Kerala's literacy rate exceeds 94%, compared with around 61% in Bihar. Infant mortality in Tamil Nadu is among the lowest in the country, while several northern states continue to record substantially higher rates despite recent improvements.
            </p>
            <p>
                For many southern leaders, this creates a paradox: states that invested heavily in education, healthcare, and population stabilisation now fear being disadvantaged in parliamentary representation because those policies succeeded.
            </p>
            <p>
                As delimitation approaches, the debate has shifted beyond constitutional arithmetic to a broader question:
            </p>
            <p style="font-weight: bold; color: #333; margin-top: 15px; font-size: 1.2rem;">
                Should developmental success reduce a state's political influence?
            </p>
            <p style="font-style: italic; font-size: 0.9em; color: #795548; margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px;">
                Map: Literacy Rate (%)
            </p>
        </div>
    </div>
</section>

<section id="outro" style="max-width: 900px; margin: 60px auto 80px auto; padding: 40px 20px; text-align: left;">
    <div style="margin-bottom: 40px;">
        <h3 style="font-family: 'Instrument Serif', serif; font-size: 2rem; color: #3e2723; margin-top: 0; margin-bottom: 20px; text-align: left;">Methodology</h3>
        <p style="font-family: 'Inter', sans-serif; font-size: 1rem; line-height: 1.6; color: #444; margin-bottom: 20px;">
            Data and source documents were acquired from public records including the NFHS-5, the Registrar General of India, Finance Commission reports, and the 2011 Census. The website is built with SvelteKit. For the interactive map views, we utilize D3.js alongside Scrollama to drive scroll-based animations. The geographical data relies on a custom script using an Indian states GeoJSON to dynamically project, align, and render state boundaries and their associated metrics, smoothly interpolating colors and positions as the user progresses through the narrative.
        </p>

        <h3 style="font-family: 'Instrument Serif', serif; font-size: 2rem; color: #3e2723; margin-top: 40px; margin-bottom: 20px; text-align: left;">AI Declaration</h3>
        <p style="font-family: 'Inter', sans-serif; font-size: 1rem; line-height: 1.6; color: #444; margin-bottom: 15px;">
            No core narrative text in this story was 'generated' or written by AI. The authors wrote and rewrote the content, using AI solely for structural formatting, grammar, and spellchecks. The visual components were designed and arranged using classical techniques of conceptualizing and illustrating the data to tell a compelling story.
        </p>
        <p style="font-family: 'Inter', sans-serif; font-size: 1rem; line-height: 1.6; color: #444; margin-bottom: 10px;">
            The author did use AI for coding assistance, meaning internal logic, scroll-based triggers, map alignment algorithms, and Svelte component scripting may have been partially or substantially LLM-generated.
        </p>
    </div>
    
    <div style="border-top: 1px solid #e0dbce; padding-top: 25px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
        <p style="color: #795548; font-size: 0.95rem; font-style: italic; margin: 0;">* Data is approximate and used for illustrative purposes.</p>
        <a href="/" style="padding: 12px 24px; background: #795548; color: #fffdf8; text-decoration: none; border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 1.05rem; font-weight: 500; transition: opacity 0.3s;">Back to Indecoded</a>
    </div>
</section>

<!-- Global Tooltip for Map -->
<svelte:window on:contextmenu|preventDefault />

<style>
    :global(body) {
        background-color: #F2E1AF !important;
    }
</style>
