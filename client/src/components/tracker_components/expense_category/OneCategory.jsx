const name = {
        enum: [
            "HOME",
            "PERSONAL CARE",
            "EDUCATION",
            "MEDICAL",
            "GROCERIES",
            "TRANSPORTATION",
            "EXPERIENCES",
            "UTILITIES",
            "TRAVEL",
            "HOBBIES",
            "SHOPPING",
            "DISPOSABLE",
        ]
    }

const description= {
    type: String,
    required: true,
    enum: [
        "Cleaning supplies, home decor, furniture, upkeep services such as lawnmowing and pool-cleaning, and renovations ",
        "Personal hygeine products, cosmetic purchases, and health and wellness expenses such as hair/skin/nail salon treatments and spa services.",
        "Tuition bills, stationary expenses, academic memberships, book or equipment rentals, etc.",
        "Healthcare related bills such as hospital or clinic expenses, medication purchases, health insurance, memberships and services for prevention or treatment, etc.",
        "Fresh produce, Meal ingredients and seasonings, Condiments, Stock beverages such as mineral water, milk, coffee, juice, etc.",
        "Auto-loan payments, fuel and vehicle-cleaning services, auto-repair expenses, auto-insurance, public transportation fare, etc.",
        "Ticket purchases for events such as movies, live concerts, museums and exhibits, festivals, cafe purchases, fast-food, etc.",
        "Rent, Mortgage payments, Bills for electric, water, heat utilities, internet and phone bills, etc.",
        "Flights, hotels and other lodging expenses, luggages expenses, babysitting, animal care services, food and souvenir shopping costs etc.",
        "All purchases of goods and services contributing to participation in your hobbies.",
        "Apparel, shoes, headwear, swimware, accessories such as bags, briefcases, jewelry, belts, eyeware, etc.",
        "Anything you would like to use your disposable income toward. May include any purchase of goods or services made with \"Retail Therapy\" in mind!",
    ]
}

const budgetPercentage= {
    required: true,
    type: Number,
    // error message
}

{timestamps:true}
