# Copyright (c) 2025, Akansha and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class CustomSalaryStructure(Document):
    def validate(self):
        earnings = sum([row.amount for row in self.custom_salary_component if row.component_type == "Earning"])
        deductions = sum([row.amount for row in self.custom_salary_component if row.component_type == "Deduction"])
        self.net_pay =  earnings - deductions
