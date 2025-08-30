// Copyright (c) 2025, Akansha and contributors
// For license information, please see license.txt

frappe.ui.form.on("Custom Salary Structure", {
    refresh(frm) {

    },
    validate(frm) {
        calculate_net_pay(frm)
    }
});

function calculate_net_pay(frm) {

    var earnings = 0;
    var deductions = 0;

    if (frm.doc.custom_salary_component) {
        for (var i = 0; i < frm.doc.custom_salary_component.length; i++) {
            var row = frm.doc.custom_salary_component[i];

            if (row.component_type === "Earning") {
                earnings += row.amount || 0;
            }
            else if (row.component_type === "Deduction") {
                deductions += row.amount || 0;
            }
        }
    }

    frm.set_value("net_pay", earnings - deductions);
}
