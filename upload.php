<?php
$to_email = "kcshyamkumar20@gmail.com";
$subject = "New File Uploaded";
$message = "A new file has been uploaded.";

$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    $attachments = array($target_file);
    $headers = "From: your_email@example.com\r\n";
    $headers .= "Reply-To: your_email@example.com\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"PHP-mixed-".$random_hash."\"\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    $body = "--PHP-mixed-".$random_hash."\r\n";
    $body .= "Content-Type: text/html; charset=\"utf-8\"\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message."\r\n";

    foreach($attachments as $attachment){
        $file = fopen($attachment,'rb');
        $data = fread($file,filesize($attachment));
        fclose($file);
        $data = chunk_split(base64_encode($data));
        $body .= "--PHP-mixed-".$random_hash."\r\n";
        $body .= "Content-Type: application/octet-stream; name=\"".basename($attachment)."\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment\r\n\r\n";
        $body .= $data."\r\n";
    }

    $body .= "--PHP-mixed-".$random_hash."--";

    mail($to_email, $subject, $body, $headers);
    echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded and sent to ".$to_email;
} else {
    echo "Sorry, there was an error uploading your file.";
}
?>
