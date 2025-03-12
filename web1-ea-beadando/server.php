<?php
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Connection: keep-alive");

$tips = [
    "Ne felejts el eleget inni edzés közben!",
    "A fehérjedús étrend segíti az izomnövekedést.",
    "Melegíts be rendesen, hogy elkerüld a sérüléseket!",
    "Ne hagyd ki a regenerációt  az alvás is része az edzésnek.",
    "Egy kis kardió reggel felpörgeti az anyagcserét."
];

while (true) {
    $randomTip = $tips[array_rand($tips)];
    echo "data: {$randomTip}\n\n";
    ob_flush();
    flush();
    sleep(5);
}
?>