<?php
header('Content-type: text/html; charset=utf-8');
set_include_path(__DIR__ . '/../system/vendor/' . PATH_SEPARATOR . __DIR__ . '/../system/' . PATH_SEPARATOR . get_include_path());
include 'vendor/autoload.php';
require('Smalot/PdfParser/Parser.php');
require('tecnickcom/tcpdf/tcpdf_parser.php');
// Parse pdf file and build necessary objects.
$parser = new \Smalot\PdfParser\Parser();

try {
$pdf    = $parser->parseFile('./test.pdf');

$text = $pdf->getText(); echo $text;exit;
echo mb_convert_encoding($text, 'utf-8');
//exit;
// Retrieve all pages from the pdf file.
$pages  = $pdf->getPages();

// Loop over each page to extract text.
foreach ($pages as $page) {
    //echo $page->getText();
}

// Retrieve all details from the pdf file.
$details  = $pdf->getDetails();

// Loop over each property to extract values (string or array).
foreach ($details as $property => $value) {
    if (is_array($value)) {
        $value = implode(', ', $value);
    }
    //echo $property . ' => ' . $value . "\n";
}

} catch (\Exception $e) {
    var_dump($e);
}

/* EOF */
