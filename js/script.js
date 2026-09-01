document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE NAVIGATION
    ========================== */

    const menuButton = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton) {

        menuButton.addEventListener("click", function () {

            navLinks.classList.toggle("open");

            const menuIsOpen =
                navLinks.classList.contains("open");

            menuButton.setAttribute(
                "aria-expanded",
                menuIsOpen
            );

        });

    }


    /* =========================
       SCROLL ANIMATION
    ========================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );


    /* =========================
       TRIP COST CALCULATOR
    ========================== */

    const calculator =
        document.getElementById(
            "tripCalculator"
        );


    if (calculator) {

        const destinationRates = {

            bali: 150,

            paris: 230,

            tokyo: 260,

            queenstown: 190,

            dubai: 210

        };


        const styleMultipliers = {

            budget: 0.85,

            standard: 1,

            luxury: 1.55

        };


        function calculateTrip() {

            const destination =
                document.getElementById(
                    "destination"
                ).value;


            const travellers =
                Number(
                    document.getElementById(
                        "travellers"
                    ).value
                );


            const days =
                Number(
                    document.getElementById(
                        "days"
                    ).value
                );


            const style =
                document.getElementById(
                    "style"
                ).value;


            if (
                !destination ||
                !travellers ||
                !days ||
                !style
            ) {

                return;

            }


            const dailyRate =
                destinationRates[
                    destination
                ];


            const accommodation =
                dailyRate *
                travellers *
                days;


            const travelBase =
                travellers * 420;


            const total =
                (
                    accommodation +
                    travelBase
                ) *
                styleMultipliers[
                    style
                ];


            document.getElementById(
                "totalCost"
            ).textContent =
                "$" +
                Math.round(total)
                    .toLocaleString("en-AU");


            document.getElementById(
                "estimateNote"
            ).textContent =
                "Estimated cost for " +
                travellers +
                " traveller(s) for " +
                days +
                " days.";


            document.getElementById(
                "breakdown"
            ).innerHTML = `

                <div>

                    <span>
                        Travel base
                    </span>

                    <strong>
                        $${travelBase.toLocaleString("en-AU")}
                    </strong>

                </div>


                <div>

                    <span>
                        Accommodation
                    </span>

                    <strong>
                        $${accommodation.toLocaleString("en-AU")}
                    </strong>

                </div>


                <div>

                    <span>
                        Travel style
                    </span>

                    <strong>
                        ${style}
                    </strong>

                </div>

            `;

        }


        calculator.addEventListener(
            "input",
            calculateTrip
        );


        calculator.addEventListener(
            "change",
            calculateTrip
        );


        calculator.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                calculateTrip();

            }
        );

    }


    /* =========================
       APPOINTMENT FORM VALIDATION
    ========================== */

    const forms =
        document.querySelectorAll(
            "form[data-validate]"
        );


    forms.forEach(
        function (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    let valid = true;


                    const requiredFields =
                        form.querySelectorAll(
                            "[required]"
                        );


                    requiredFields.forEach(
                        function (field) {

                            const error =
                                field.parentElement
                                    .querySelector(
                                        ".error"
                                    );


                            if (
                                !field.value.trim()
                            ) {

                                valid = false;


                                if (error) {

                                    error.textContent =
                                        "Please complete this field.";

                                }

                            }

                            else {

                                if (error) {

                                    error.textContent =
                                        "";

                                }

                            }

                        }
                    );


                    const email =
                        form.querySelector(
                            "input[type='email']"
                        );


                    if (
                        email &&
                        email.value &&
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            .test(email.value)
                    ) {

                        valid = false;


                        const error =
                            email.parentElement
                                .querySelector(
                                    ".error"
                                );


                        if (error) {

                            error.textContent =
                                "Please enter a valid email address.";

                        }

                    }


                    if (valid) {

                        const success =
                            form.querySelector(
                                ".success"
                            );


                        if (success) {

                            success.style.display =
                                "block";


                            success.textContent =
                                "Thank you. Your appointment request has been recorded.";

                        }


                        form.reset();

                    }

                }
            );

        }
    );


    /* =========================
       CONTACT EMAIL
    ========================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "contactName"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "contactEmail"
                    ).value.trim();


                const message =
                    document.getElementById(
                        "contactMessage"
                    ).value.trim();


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    alert(
                        "Please complete all fields."
                    );

                    return;

                }


                const subject =
                    encodeURIComponent(
                        "WanderLux enquiry from " +
                        name
                    );


                const body =
                    encodeURIComponent(
                        "Name: " +
                        name +
                        "\nEmail: " +
                        email +
                        "\n\n" +
                        message
                    );


                window.location.href =
                    "mailto:hello@wanderlux.example" +
                    "?subject=" +
                    subject +
                    "&body=" +
                    body;

            }
        );

    }

});
