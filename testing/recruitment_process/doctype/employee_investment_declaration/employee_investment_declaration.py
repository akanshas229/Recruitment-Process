# Copyright (c) 2025, Akansha and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class EmployeeInvestmentDeclaration(Document):

    def validate(self):
        emp = frappe.get_doc("Custom Employee", self.employee)
        regime = emp.tax_regime_preference

        if regime == "Old Regime":
            structure_name = "Old Regime"
        else:
            structure_name = "New Regime"

        structure = frappe.get_doc("Custom Salary Structure", structure_name)
        self.custom_salary_structure = structure.name
        self.set("custom_salary_component", [])

        for row in structure.custom_salary_component:
            self.append("custom_salary_component", {
                "component_type": row.component_type,
                "component_name": row.component_name,
                "amount": row.amount
            })

        earnings = sum(r.amount for r in self.custom_salary_component if r.component_type == "Earning")
        deductions = sum(r.amount for r in self.custom_salary_component if r.component_type == "Deduction")

        investment = frappe.db.get_value(
            "Employee Investment Declaration",
            {"employee": self.employee},
            ["section_80c", "section_80d", "other_exemptions", "total_investment"],
            as_dict=True
        ) or {}

        tax_exemptions = investment.get("total_investment", 0)

        taxable_income = max(0, earnings - deductions - tax_exemptions)

        self.net_pay = taxable_income
