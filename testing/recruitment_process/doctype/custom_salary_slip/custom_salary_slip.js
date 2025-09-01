// Copyright (c) 2025, Akansha and contributors
// For license information, please see license.txt

frappe.ui.form.on("Custom Salary Slip", {
    salary_structure: function (frm) {
        if (frm.doc.salary_structure) {
            frappe.call({
                method: "frappe.client.get",
                args: {
                    doctype: "Custom Salary Structure",
                    name: frm.doc.salary_structure
                },
                callback: function (r) {
                    if (r.message) {
                        let structure = r.message;

                        frm.clear_table("custom_salary_component");

                        if (structure.custom_salary_component) {
                            structure.custom_salary_component.forEach(row => {
                                let child = frm.add_child("custom_salary_component");
                                child.component_type = row.component_type;
                                child.component_name = row.component_name;
                                child.amount = row.amount;
                            });
                        }

                        frm.refresh_field("custom_salary_component");

                        let earnings = 0;
                        let deductions = 0;

                        frm.doc.custom_salary_component.forEach(row => {
                            if (row.component_type === "Earning") {
                                earnings += row.amount || 0;
                            } else if (row.component_type === "Deduction") {
                                deductions += row.amount || 0;
                            }
                        });

                        frm.set_value("net_pay", earnings - deductions);
                    }
                }
            });
        }
    }
});
