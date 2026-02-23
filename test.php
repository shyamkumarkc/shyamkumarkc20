<?php
$url = "https://cdsc.com.np/ipolist";

// fetch page
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$html = curl_exec($ch);
curl_close($ch);

if(!$html){
    die("Failed to fetch data.");
}

// load HTML
libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML($html);
$xpath = new DOMXPath($dom);

// find table rows
$rows = $xpath->query("//table//tr");

echo "<style>
table{border-collapse:collapse;width:100%;font-family:Arial}
th,td{border:1px solid #ccc;padding:8px;text-align:center}
th{background:#0a58ca;color:#fff}
</style>";

echo "<table>";
foreach($rows as $row){
    echo "<tr>";
    foreach($row->childNodes as $cell){
        if($cell->nodeName=="th" || $cell->nodeName=="td"){
            echo "<".$cell->nodeName.">".trim($cell->textContent)."</".$cell->nodeName.">";
        }
    }
    echo "</tr>";
}
echo "</table>";
?>
