<script>
    import { onMount } from "svelte";
    import { initDelimitation } from "$lib/delimitation.js";

    onMount(() => {
        initDelimitation();
    });
</script>

<section id="intro">
    <h1>Where do we draw the line?</h1>
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
            <strong style="color: #bf360c;"
                >The last redistribution of Lok Sabha seats between states was
                done in 1972, more than 5 decades ago!</strong
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
            first Census after 2026. As a result of this freeze, India still
            relies on the 1971 Census for allocation of seats in the Parliament
            to States!
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
                seats. Thus, the Lok Sabha seats are still fixed at 543.
            </p>
        </div>

        <h2 style="color: #bf360c;">Why is that a problem?</h2>
        <p>
            By the time the first Census figures after 2026 will be published,
            the population figures used to allot parliamentary and assembly
            seats to each state will be 6 decades old.
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
                If post-2026 delimitation relies solely on population, UP could
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

        <div class="step" data-step="5">
            <h2>The Representation Gap</h2>
            <p>
                This also impacts the quality of representative democracy.
                Currently, one MP from Tamil Nadu represents a constituency of
                approximately 18 lakh people, whereas an MP from Uttar Pradesh
                represents around 25 lakh. The larger the constituency, the
                harder it becomes for a representative to effectively prioritize
                local issues and engage with citizens.
            </p>
            <p
                style="font-style: italic; font-size: 0.9em; color: #795548; margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px;"
            >
                Map: Population Distribution (2011 Census)
            </p>
        </div>

        <div class="step" data-step="6" data-color="FertilityRate">
            <h2>The Role of Fertility</h2>
            <p>
                Why the shift? The Total Fertility Rate (TFR) in Bihar remains
                high at 2.98, while Kerala is at 1.7. Southern states dropped
                below the replacement rate of 2.1 decades ago. They successfully
                implemented the very population control policies the Union
                government demanded in 1971.
            </p>
            <p
                style="font-style: italic; font-size: 0.9em; color: #795548; margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px;"
            >
                Map: Total Fertility Rate (TFR)
            </p>
        </div>

        <div class="step" data-step="7" data-color="GDPPerCapita">
            <h2>Economic Disconnect</h2>
            <p>
                This creates a tension: states losing political power are the
                economic engines. The five southern states represent just 20% of
                the population but contribute over 30% to India's GDP. Per
                capita income in Tamil Nadu (₹2.7 lakh) is nearly six times
                higher than in Bihar (₹46,000).
            </p>
            <p
                style="font-style: italic; font-size: 0.9em; color: #795548; margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px;"
            >
                Map: GDP Per Capita (INR)
            </p>
        </div>

        <div class="step" data-step="8" data-color="TaxContribution">
            <h2>Tax Contribution</h2>
            <p>
                For every ₹100 contributed to central taxes, states like
                Karnataka receive just ₹15 back, while Uttar Pradesh receives
                ₹273 and Bihar ₹922. The fiscal redistribution system relies
                heavily on the surplus generated by the very states slated to
                lose parliamentary representation.
            </p>
            <p
                style="font-style: italic; font-size: 0.9em; color: #795548; margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px;"
            >
                Map: Central Tax Contribution vs Return
            </p>
        </div>

        <div class="step" data-step="9" data-color="Literacy">
            <h2>Development Outcomes</h2>
            <p>
                Kerala's literacy rate sits at 96%, compared to Bihar's 61%.
                Infant mortality in Tamil Nadu is 13 per 1000, while UP is 38.
                The paradox of the 2026 delimitation is that it effectively
                punishes human development success with political
                marginalization.
            </p>
            <p
                style="font-style: italic; font-size: 0.9em; color: #795548; margin-top: 20px; border-top: 1px solid #e0dbce; padding-top: 10px;"
            >
                Map: Literacy Rate (%)
            </p>
        </div>

        <div class="step" data-step="10" data-chart="true">
            <h2>The Impending Crisis</h2>
            <p>
                In a 543-seat Lok Sabha, the Hindi heartland's share could jump
                from 42% to nearly 50%, enough to form a government virtually
                unassisted. This forces a fundamental question: In a federal
                union, should democratic representation purely be 'one person,
                one vote', or must it balance demographic weight with economic
                contribution?
            </p>
        </div>
    </div>
</section>

<section id="outro">
    <p>Data is approximate and used for illustrative purposes.</p>
    <a href="/">Back to Indecoded</a>
</section>
