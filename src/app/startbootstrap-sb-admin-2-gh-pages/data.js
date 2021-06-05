/**
 * Data and settings for the company
 *
 * How to properly enter your data:
 * Be sure when entering your information to enclose that data with double quotes. When entering numbers they
 * don't need to be enclosed with quotes, in general the sample data below should be used as general guide on
 * how to properly enter your data. And if you have double (or single) quotes in your data (like My "Awesome" Company)
 * than you should use something we call escaping special characters with the backslash sign (\) so the final
 * company name will be "My \"Awesome\" Company".
 */

var ib_invoice_data = {
  "{company_logo}"          : "@@LOGO", // base64 encoded data URI of PNG image
  "{company_name}"          : "Nom du structure",
  "{company_address}"       : "● Adresse de structure",
  "{company_city_zip_state}": " ● Code postale",
  "{company_phone_fax}"     : "Numéro téléphone de structure ",
  "{company_email_web}"     : " ● Email  ",
  "{payment_info1}"         : "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Payment details:",
  "{payment_info2}"         : "&nbsp; &nbsp; &nbsp; &nbsp; ● ACC 123006705",
  "{payment_info3}"         : "&nbsp; &nbsp; ● IBAN US100000060345",
  "{payment_info4}"         : "● SWIFT BOA447",
  "{payment_info5}"         : "",
  "{issue_date_label}"      : "Edité le:",
  
  "{issue_nom}"             :"Nedra ben youssef",
  "{payment_info5}"         :"Entrer votre nom",
  "{issue_date}"            : "",
  "{net_term_label}"        : "Net:",
  "{net_term}"              : 21,
  "{due_date_label}"        : "Validé le :",
  "{due_date}"              : "",
  "{currency_label}"        : "Currency:",
  "{currency}"              : "USD",
  "{po_number_label}"       : "P.O. #",
  "{po_number}"             : "1/3/4",
  "{bill_to_label}"         : "To:",
  "{client_name}"           : "Slate Rock and Gravel Company",
  "{client_address}"        : "222 Rocky Way",
  "{client_city_zip_state}" : "30000 Bedrock, Cobblestone County",
  "{client_phone_fax}"      : "+555 7 123-5555",
  "{client_email}"          : "fred@slaterockgravel.bed",
  "{client_other}"          : "Attn: Fred Flintstone",
  "{invoice_title}"         : "Facture",
  "{invoice_number}"        : "#001",
  "{item_row_number_label}" : "",
  "{item_description_label}": "Désignation",
  "{item_quantity_label}"   : "Qté",
  "{item_price_label}"      : "P.U.HT",
  "{item_discount_label}"   : "Remise",
  "{item_tax_label}"        : "Taxe",
  "{item_line_total_label}" : "Net HT",
  "{item_row_number}"       : "",
  "{item_description}"      : "",
  "{item_quantity}"         : "",
  "{item_price}"            : "",
  "{item_discount}"         : "",
  "{item_tax}"              : "",
  "{item_line_total}"       : "",
  "{amount_subtotal_label}" : "NET HT:",
  "{amount_subtotal}"       : "",
  "{tax_name}"              : "Tax:",
  "{tax_value}"             : "",
  "{amount_total_label}"    : "Total:",
  "{amount_total}"          : "",
  "{amount_paid_label}"     : "Paid:",
  "{amount_due_label}"      : "NET A PAYER:",
  "{amount_due}"            : "",
  "{terms_label}"           : "Thanks!",
  "{terms}"                 : "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ",

  // Settings
  "date_format"             : "mm/dd/yyyy", // One of dd/mm/yyyy, dd-mm-yyyy, mm/dd/yyyy, mm-dd-yyyy
  "currency_position"       : "left", // One of left or right
  "default_columns"         : ["item_row_number", "item_description", "item_quantity", "item_price", "item_discount", "item_tax", "item_line_total"],
  "default_quantity"        : "1",
  "default_price"           : "0",
  "default_discount"        : "0",
  "default_tax"             : "0",
  "default_number_rows"     : 3,
  "auto_calculate_dates"    : true,
  "load_items"              : true,
  "invoicebus_fineprint"    : true,

  // Items
  "items": [
    {
      "item_description" : "Frozen Brontosaurus Ribs",
      "item_quantity"    : "2",
      "item_price"       : "120",
      "item_discount"    : "",
      "item_tax"         : "2%"
    },
    {
      "item_description" : "Mammoth Chops",
      "item_quantity"    : "14",
      "item_price"       : "175",
      "item_discount"    : "-10%",
      "item_tax"         : "5%"
    },
    {
      "item_description" : "",
      "item_quantity"    : "",
      "item_price"       : "",
      "item_discount"    : "",
      "item_tax"         : ""
    }
  ]
};
