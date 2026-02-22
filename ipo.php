<?php
$url = "https://cdsc.com.np/ipolist";

$html = file_get_contents($url);

libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML($html);

$xpath = new DOMXPath($dom);
$rows = $xpath->query("//table//tr");

$data = [];

foreach($rows as $i=>$row){
    if($i==0) continue;

    $cols = $row->getElementsByTagName("td");

    if($cols->length > 8){
        $data[] = [
            "company" => trim($cols->item(1)->nodeValue),
            "manager" => trim($cols->item(2)->nodeValue),
            "units"   => trim($cols->item(3)->nodeValue),
            "open"    => trim($cols->item(7)->nodeValue),
            "close"   => trim($cols->item(8)->nodeValue),
            "update"  => trim($cols->item(9)->nodeValue)
        ];
    }
}
?>

<!DOCTYPE html>
<html>
<head>
<title>IPO Update</title>
<style>
body{font-family:Arial;background:#f4f7fb;padding:20px}
table{width:100%;border-collapse:collapse;background:white}
th,td{padding:10px;border:1px solid #ddd}
th{background:#1e63d6;color:white}
</style>
</head>
<body>

<h2>Current Issue Update</h2>

<table>
<tr>
<th>Company</th>
<th>Manager</th>
<th>Units</th>
<th>Open</th>
<th>Close</th>
<th>Last Update</th>
</tr>

<?php foreach($data as $row){ ?>
<tr>
<td><?= $row["company"] ?></td>
<td><?= $row["manager"] ?></td>
<td><?= $row["units"] ?></td>
<td><?= $row["open"] ?></td>
<td><?= $row["close"] ?></td>
<td><?= $row["update"] ?></td>
</tr>
<?php } ?>

</table>

</body>
</html>
