<?php
require_once __DIR__ . '/../src/autoloader.inc.php';

$sessionManager = new SessionManager();
$sessionManager->checkArraySession();

$json = WebServerRequest::getPostKeyValue('deletableSettings');

if ($json != null)
{
    $databaseDataManager = new DatabaseDataManager();

    $jsonDecoded = json_decode($json, true);
    $lastError = json_last_error();

    if ($lastError === JSON_ERROR_NONE)
    {
        $deletableDomain = $jsonDecoded['domain'];
        $deletableLocationIds = $jsonDecoded['locationIds'];
        $deletableUrls = $jsonDecoded['urls'];

        $deletableDomainId = $databaseDataManager->getDomainId($deletableDomain);

        if (array_key_exists('id', $deletableDomainId))
        {
            $databaseDataManager->deleteDomain($deletableDomainId['id']);
            foreach ($deletableLocationIds as $deletableLocationId)
            {
                $databaseDataManager->deleteLocations($deletableDomainId['id'], $deletableLocationId);
            }

            foreach ($deletableUrls as $deletableUrl)
            {
                $databaseDataManager->deleteUrl($deletableDomainId['id'], $deletableUrl);
            }
        }
        echo ResponseStatus::SUCCESS_STATUS;
    }
    else
    {
        echo $lastError;
    }
}