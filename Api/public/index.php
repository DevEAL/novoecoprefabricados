<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/config/db.php';
require __DIR__ . '/../src/utils/printJson.php';
require __DIR__ . '/../src/utils/sedMail.php';
require __DIR__ . '/../src/utils/CrearHTML.php';

require __DIR__ . '/../src/controller/Cotizar.php';
require __DIR__ . '/../src/model/Cotizar.php';

require __DIR__ . '/../src/controller/Contact.php';
require __DIR__ . '/../src/model/Contact.php';

require __DIR__ . '/../src/controller/enlaces.php';
require __DIR__ . '/../src/model/enlaces.php';

$app = new \Slim\App;


// Routes
require __DIR__. '/../src/routes/routes.php';

$app->run();