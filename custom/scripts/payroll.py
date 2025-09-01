import frappe

def calculate_tax_with_investment(doc, method):
    investment = frappe.db.get_value("Employee Investment Declaration", 
        {"employee": doc.employee},
            ["total_exemptions"],
            as_dict=True
    )

    if investment and investment.get("total_exemptions"):
        exemptions = investment["total_exemptions"]

        taxable_income = (doc.gross_pay or 0) - exemptions
        if taxable_income < 0:
            taxable_income = 0

        tax = taxable_income * 0.1

        doc.append("deductions", {
            "salary_component": "Income Tax (Adjusted)",
            "amount": tax
        })

        doc.net_pay = doc.gross_pay - sum(d.amount for d in doc.deductions)
