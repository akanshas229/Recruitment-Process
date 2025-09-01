// Copyright (c) 2025, Akansha and contributors
// For license information, please see license.txt

frappe.ui.form.on("Employee Investment Declaration", {
    refresh(frm) {

    },
    section_80c: function (frm) {
        calculate_total(frm)
    },
    section_80d: function (frm) {
        calculate_total(frm)
    },
    other_exemptions: function (frm) {
        calculate_total(frm)
    },

});
function calculate_total(frm) {
    let total = (frm.doc.section_80c || 0) + (frm.doc.section_80d || 0) + (frm.doc.other_exemptions || 0);
    frm.set_value("total_investment", total);
}
