// Copyright (c) 2025, Akansha and contributors
// For license information, please see license.txt


frappe.ui.form.on("Custom Salary Structure", {
    validate: function (frm) {
        calculate_net_pay(frm);
    }
});
frappe.ui.form.on("Custom Salary Componen", {
    amount: function (frm) {
        calculate_net_pay(frm);
    },
    component_type: function (frm) {
        calculate_net_pay(frm);
    },


});

function calculate_net_pay(frm) {
    let earnings = 0;
    let deductions = 0;

    if (frm.doc.custom_salary_component) {
        frm.doc.custom_salary_component.forEach(row => {
            if (row.component_type === "Earning") {
                earnings += row.amount || 0;
            } else if (row.component_type === "Deduction") {
                deductions += row.amount || 0;
            }
        });
    }

    frm.set_value("net_pay", earnings - deductions);
}
