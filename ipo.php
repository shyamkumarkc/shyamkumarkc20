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

    if($cols->length>5){
        $data[] = [
            "company"=>$cols->item(1)->nodeValue,
            "manager"=>$cols->item(2)->nodeValue,
            "units"=>$cols->item(3)->nodeValue,
            "open"=>$cols->item(7)->nodeValue,
            "close"=>$cols->item(8)->nodeValue,
            "update"=>$cols->item(9)->nodeValue
        ];
    }
}
?>

<!DOCTYPE html>
<html>
<head>
<title>IPO Updates</title>
<style>
body{font-family:Arial;background:#f4f7fb;padding:25px}
table{width:100%;border-collapse:collapse;background:white}
th,td{padding:10px;border:1px solid #ddd;text-align:left}
th{background:#0a66ff;color:white}
.card{background:white;padding:20px;border-radius:12px;box-shadow:0 10px 25px rgba(0,0,0,.1)}
</style>
</head>
<body>

<div class="card">
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

<?php foreach($data as $d){ ?>
<tr>
<td><?= $d["company"] ?></td>
<td><?= $d["manager"] ?></td>
<td><?= $d["units"] ?></td>
<td><?= $d["open"] ?></td>
<td><?= $d["close"] ?></td>
<td><?= $d["update"] ?></td>
</tr>
<?php } ?>

</table>

</div>

</body>
</html>
