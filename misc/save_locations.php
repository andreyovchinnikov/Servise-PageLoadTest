<?php
require_once __DIR__ . '/../src/autoloader.inc.php';

$database = new Database(Config::MYSQL_HOST, Config::MYSQL_DATABASE, Config::MYSQL_USERNAME, Config::MYSQL_PASSWORD);

$apiKey = $database->executeQuery("SELECT api_key FROM " . DatabaseTable::USER .
                                  " WHERE id = ?", [Config::DEFAULT_USER_ID], PDO::FETCH_COLUMN);

$client = new WebPageTestClient($apiKey);

$locationsInfo = $client->getLocations();
$locations = array_keys($locationsInfo);

foreach ($locations as $location)
{
    if (array_key_exists('Browsers', $locationsInfo[$location]))
    {
        $browsersLocation = $locationsInfo[$location]['Browsers'];
        $browsers = explode(',', $browsersLocation);
        for ($i = 0; $i < count($browsers); $i++)
        {
            $fullLocation = $location . ':' . $browsers[$i];
            $database->executeQuery("INSERT INTO " . DatabaseTable::WPT_LOCATION . " (location) VALUE (?)", [$fullLocation]);
            echo $fullLocation;
        }
    }
}