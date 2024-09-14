#!/usr/bin/env php
<?php
/**
 * vcrypt.php
 *
 * Script CLI de chiffrage de texte.
 *
 * @author    Nicolas DUPRE
 * @release   04/04.2019
 * @version   0.1.0
 * @package   Index
 *
 */

/**
 * Règles de gestion :
 *
 *    1. Les shortopt sont traités en priorité sur les longopt
 *       Les shortopt et longopt correspondantes sont appended dans le tableau de shortopt
 *
 *
 *    2. Cas des argument(s) d'entrée (text ou fichier) :
 *      Sans fichier(s) de sortie :
 *          -> Flux standard
 *
 *      Avec fichier(s) de sortie n pour n :
 *          -> Dans le fichier de sortie de même index /!\ attention fichier > text /!\
 *
 *      Avec fichier(s) de sortie n pour z :
 *          -> Dans le fichier de sortie de même index /!\ attention fichier > text /!\
 *          -> Le reste dans le flux standard
 *
 *      Note, en cas de fichier en entré introuvable, la sortie
 *      correspondante est ignoré pour ne pas décaller les sorties n pour n ou n pour z.
 *
 *
 *    3. Règle de prioritaire pour entrées combinées :
 *       - Priorité aux fichiers
 *       - Suivis des texts
 *
 *          exemple : -i file1 -t "text1" -i file2 -t "text2" -o for-file1 -o for-file2 -o for-text1 -o for-text2
 *
 *
 *    4. Une seule instruction -c, --crypt ou -d, --decrypt est permise dans la ligne de commande
 *      l'opération -c, --crypt est prioritaire sur -d,--decrypt
 *
 *
 *    5. Le jeu de clés (-k,--key) passés est combinés pour faire le chiffrage/déchiffrage pour les n entrées à crypter
 *
 *
 */


/**
 * Version 0.1.0 : 05/01/2018
 * --------------------------
 *
 *
 */

//echo ord("A");
//echo chr(65);
//echo hexdec("F");

namespace vcrypt;

use Exception;
use InvalidArgumentException;

class vcrypt
{
    /**
     * Liste des différentes options utilisée dans la classe MakeSum.
     */
    const OPTIONS = [
        'colors' => [
            'color_err' => '196',
            'color_in' => '220',
            'color_suc' => '76',
            'color_war' => '208',
            'color_txt' => '221',
            'color_kwd' => '39'
        ],
        'separator' => ',',
        'shortopt' => "hi:o:cdt:k:s",
        "longopt" => [
            "help",
            "in-source:",
            "out-source:",
            "crypt",
            "decrypt",
            "text:",
            "keys:",
            "silent"
        ]
    ];

    /**
     * @var string $workdir Dossier de travail
     */
    protected $workdir = null;

    /**
     * @var string $cmdName Nom de la commande
     */
    protected $cmdName = null;

    /**
     * @var array $argv
     */
    protected $argv = null;



    /**
     * @var array $langsToProcess Liste des langues à traiter.
     */
    protected $langsToProcess = [];

    /**
     * @var bool|resource $psdtout Pointeur vers la ressource de sortie standard.
     */
    protected $psdtout = STDOUT;

    /**
     * @var bool|resource $pstderr Pointeur vers la ressource de sortie des erreurs.
     */
    protected $pstderr = STDERR;

    /**
     * @var bool $noDie Flag pour ne pas jouer les evenements die.
     */
    protected $noDie = false;

    /**
     * Constructor function.
     *
     * @param string $workdir Path to working directory.
     * @param array  $argv    Array of command line arguments.
     *
     * @throws \InvalidArgumentException
     */
    public function __construct($workdir, array $argv, $cmdName)
    {
        $workdir = trim($workdir);
        if (empty($workdir)) {
            throw new InvalidArgumentException("workdir parameter in constructor can't be empty.");
        }
        if (!is_dir($workdir)) {
            throw new InvalidArgumentException("workdir `{$workdir}` doesn't exist.");
        }
        $this->workdir = $workdir;
        $this->argv = $argv;
        $this->cmdName = $cmdName;
    }

    /**
     * Exécution du script.
     *
     * @return bool
     */
    public function __run ()
    {
        $options = $this->argv;
        $showHelp = true;

//        print_r($options);

//        $directory = @($options["d"]) ?: (@$options["dir"]) ?: $this->workdir;

//        $fullPath = (preg_match("#^\/#", $directory)) ? $directory : $this->workdir . '/' . $directory;

        // Afficher l'aide si demandée et s'arrêter là.
        if (
            array_key_exists("h", $options)
            || array_key_exists("help", $options)
        ) {
            $this->help();
            return true;
        }


        // Effectue l'opération de chiffrage.
        if (
            array_key_exists("c", $options)
            || array_key_exists("crypt", $options)
        ) {
            if (!$this->canRun()) $this->stderr("Missing option %s and/or %s and %s.", ["-i", "-t", "-k"]);
            $this->crypt();
            return true;
        }


        // Effectue l'opération de déchiffrage.
        if (
            array_key_exists("d", $options)
            || array_key_exists("decrypt", $options)
        ) {
            if (!$this->canRun()) $this->stderr("Missing option %s and/or %s and %s.", ["-i", "-t", "-k"]);
            $this->decrypt();
            return true;
        }

        // Traitement
        if ($showHelp) $this->help();

        return true;
    }

    /**
     * Vérifie si l'on peu effectuer une opération de chiffrage ou déchiffrage.
     *
     * @return bool
     */
    protected function canRun ()
    {
        return (
            $this->isOption(["i", "in-source", "t", "text"])
            && $this->isOption(["k", "keys"])
        );
    }

    protected function crypt ()
    {
        $this->postCrypt('crypt');
    }

    protected function decrypt ()
    {
        $this->postCrypt('decrypt');
    }

    protected function postCrypt ($process)
    {
        $factor = 1;

        switch ($process) {
            case 'crypt':
                $factor = 1;
                break;
            case 'decrypt':
                $factor = -1;
                break;
        }

        $options = $this->argv;
        $keys = $this->getKeys();

        $inputs = $this->getInputs();
        $texts = $this->getTexts();
        $outputs = $this->getOutputs();
        $outIndex = 0;
        $outputContent = null;

        // Regroupement en array pour unifier le process de cryptage
        $sources = [
            // Fichiers en premiers
            "file" => $inputs,
            // Texts en second lieux
            "text" => $texts
        ];

        // Traiter toutes les sources
        foreach ($sources as $type => $typeSources) {
            foreach ($typeSources as $idxt => $source) {
                $inputContent = null;

                // Récupération du contenu à crypter
                switch ($type) {
                    case 'file':
                        if (file_exists($source)) {
                            $inputContent = file_get_contents($source);
                            continue;
                        } else {
                            $this->stderr("File %s does not exist", [$source]);
                            // On met à jour l'index des sorties, car on ne peux pas prendre la décision
                            // de tout décaller ce que l'utilisateur avait prévu dans sa commande
                            $outIndex++;
                            continue;
                        }

                        break;
                    case 'text':
                        $inputContent = $source;
                        break;
                }

                // Chiffrage du contenu (avec RAZ de la variable)
                $outputContent = null;

                foreach ($keys as $idx => $key) {
                    // Si $outputContent n'est pas null
                    // On est dans une étape de surchiffrage
                    // l'inputContent doit être celui de l'outputContent
                    // Remize à zéro de l'output content
                    if ($outputContent !== null) {
                        $inputContent = $outputContent;
                        $outputContent = null;
                    }

                    $keyLen = strlen($key);
                    $textLen = strlen($inputContent);

                    for ($p = 0; $p < $textLen; $p++) {
                        $kp = $p % $keyLen;
                        $outputContent .= chr(ord($inputContent[$p]) + ( $factor * ord($key[$kp])));
                    }
                }

                // Mettre le contenu dans la sortie correspondante
                if ($outIndex <= count($outputs) - 1) {
                    $output = $outputs[$outIndex];
                    file_put_contents($outputs[$outIndex], $outputContent);
                    $outIndex++;
                    $message = ($type === 'file') ?
                        "The file %s has been ${process}ed in file %s" :
                        "The text %s has been ${process}ed in file %s";
                    $this->stdout($message, [$source, $output]);
                }
                // Si pas de sortie correspondante en face de cet input,
                // Utilisé le flux standard
                else {
                    $message = ($type === 'file') ?
                        "Please find below the ${process}ed content of file %s :" :
                        "Please find below the ${process}ed result of text %s";
                    $this->stdout($message, [$source]);
                    echo $outputContent . PHP_EOL; // Les caractères spéciaux plante vsprintf
                }
            }
        }
    }

    protected function getInputs ()
    {
        return $this->getOpts(['i', 'in-source']);
    }

    protected function getOutputs ()
    {
        return $this->getOpts(['o', 'out-source']);
    }

    protected function getTexts ()
    {
        return $this->getOpts(['t', 'text']);
    }

    protected function getOpts (Array $opts)
    {
        $outputArray = [];

        foreach ($opts as $idx => $opt) {
            if ($this->isOption([$opt])) $this->optToArray($this->argv, $opt, $outputArray);
        }

        return $outputArray;
    }

    protected function optToArray ($optpool, $name, &$array)
    {
        // Est-ce que l'option existe
        if (isset($optpool[$name])) {
            if (is_array($optpool[$name])) {
                $array = array_merge($array, $optpool[$name]);
            } else {
                $array = array_merge($array, [$optpool[$name]]);
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * Affiche le manuel d'aide.
     *
     * @param int $level
     *
     * @return void
     */
    protected function help($level = 0)
    {
        $separator = self::OPTIONS['separator'];
        $name = $this->cmdName;

        $man = <<<HELP
        
Usage : $name [OPTIONS]

Description here

-h, --help      Display this text.
-o, --out-file  Write in this out-file.
-c, --crypt     Crypt the input.
-d, --decrypt   Uncrypt the input.
-i, --in-file   Input file to (un)crypt.
-t, --text      Input text to (un)crypt.
-k, --keys      Input one or more key to encrypt your input.
                Use separator: $separator
-s, --silent    Hide INFO message

Details :

  1. Short options have the priority on long options although they are not skipped.
     E.g.: --keys 123 -k 456 (meaning two encryptions are made)
     Key 456 will be used first, then 123 will be used after.
  
  2. Combined sources :
     Files are processed before texts
     E.g.: --in-source file1 -t text1 -i file2 --text text2
     will be process in this order
       1. file2
       2. file1
       3. text1
       4. text2     
  
  3. Inputs & Outputs :
     • Without outputs : Results are displayed in STDOUT
     • With n outpus for n inputs : 
        - Results are redirected in corresponding specified outputs
        - /!\ Don't forget files are processed before texts /!\
     • With n outputs for z inputs :
        - Results are redirected in corresponding specified outputs
        - Last results are displayed in STDERR
     • /!\ When a source file failed, the corresponding output is skipped /!\
     
  4. Only one process can be done at once :
     Crypting (-c,--crypt) have the priority on uncryption (-d, --decrypt).
     
  5. Keys used for encryption must be used in the reverse order to uncryption
     E.g.: -c -k key1 -k key2  ==> -d -k key2 -k key1

HELP;
        fwrite($this->psdtout, $man . PHP_EOL);
        if ($level) die($level);
    }

    /**
     * Met en évidence les valeurs utilisateur dans les messages
     *
     * @param  string $message Message à analyser
     *
     * @return string $message Message traité
     */
    protected function highlight($message)
    {
        $color_in = self::OPTIONS['colors']['color_in'];

        // A tous ceux qui n'ont pas de couleur spécifiée, alors saisir la couleur par défaut
        $message = preg_replace("/(?<!>)(%[a-zA-Z0-9])/", "$color_in>$1", $message);

        // Remplacer par le code de colorisation Shell
        $message = preg_replace("#([0-9]+)>(%[a-zA-Z0-9])#", "\e[38;5;$1m$2\e[0m", $message);

        return $message;
    }

    protected function isOption ($opts, $op = "or")
    {
        $opts = (!is_array($opts)) ? [$opts] : $opts;

        $return = (strtolower($op) === "or") ? false : true;

        foreach ($opts as $idx => $opt) {
            if (array_key_exists($opt, $this->argv)) {
                if (strtolower($op) === "or") {
                    return true;
                }
            } else {
                if (strtolower($op) === "and") {
                    return false;
                }
            }
        }

        return $return;
    }

    protected function getKeys ()
    {
        // Récupération des clés.
        $keys = (@$this->argv['k']) ?: @$this->argv["keys"];
        $keys = (!is_array($keys)) ? [$keys] : $keys;
        $allKeys = [];

        // Déspliter toutes les clés.
        array_map(function ($el) use (&$allKeys) {
            $allKeys = array_merge($allKeys, explode(self::OPTIONS['separator'], $el));
        }, $keys);

        // Cryptage des clés.
        $keys = array_map(function ($el) {
            return sha1($el);
        }, $allKeys);

        return $keys;
    }

    /**
     * Regroupe les matches au sein du même tableau au lieu du regroupement par défaut.
     *
     * @param array $array Référence à inverser.
     *
     * @return bool
     */
    protected function preg_match_reverse_grouping (Array &$array)
    {
        if (!count($array)) return false;

        if (!is_array($array[0]) || !count($array[0])) return false;

        $matches = count($array);
        $reversed = [];

        foreach ($array[0] as $index => $match) {
            $instance = [];
            $instance[0] = $match;

            for ($i = 1; $i < $matches; $i++) {
                $instance[$i] = $array[$i][$index];
            }

            $reversed[$index] = $instance;
        }

        $array = $reversed;

        return true;
    }

    /**
     * Emet des messages dans le flux STDERR de niveau WARNING ou ERROR
     *
     * @param string $message Message à afficher dans le STDERR
     * @param array  $args    Elements à introduire dans le message
     * @param int    $level   Niveau d'alerte : 0 = warning, 1 = error
     *
     * @return void
     */
    protected function stderr($message, array $args = [], $level = 1)
    {
        // Connexion aux variables globales
        $color_err = self::OPTIONS['colors']['color_err'];
        $color_war = self::OPTIONS['colors']['color_war'];

        // Traitement en fonction du niveau d'erreur
        $level_str = ($level) ? "ERROR" : "WARNING";
        $color = ($level) ? $color_err : $color_war;

        // Mise en evidence des saisie utilisateur
        $message = $this->highlight($message);
        $message = "[ \e[38;5;{$color}m$level_str\e[0m ] :: $message" . PHP_EOL;

        fwrite($this->pstderr, vsprintf($message, $args));
        if ($level && !$this->noDie) die($level);
    }

    /**
     * Emet des messages dans le flux classique STDOUT
     *
     * @param string $message Message à afficher dans le STDOUT
     * @param array  $arg     Elements à introduire dans le message
     */
    protected function stdout($message, $args = [], $title = 'INFO')
    {
        $options = self::OPTIONS;

        if (!$this->isOption(['s', 'silent'])) {
            $prefix = (!empty($title)) ? "[ $title ] :: " : "";

            $message = $this->highlight($message);
            $message = "$prefix$message".PHP_EOL;
            fwrite($this->psdtout, vsprintf($message, $args));
        }
    }

    /**
     * Définie la ressource de sortie standard.
     *
     * @param bool|resource $stdout Pointeur vers une ressource ayant un accès en écriture.
     */
    public function setStdout($stdout = STDOUT)
    {
        $this->psdtout = $stdout;
    }

    /**
     * Définie la ressource de sortie des erreurs.
     *
     * @param bool|resource $stderr Pointeur vers une ressource ayant un accès en écriture.
     */
    public function setStderr($stderr = STDERR)
    {
        $this->pstderr = $stderr;
    }

    /**
     * Définie le comportement des fonctions die.
     *
     * @param bool $nodie
     */
    public function setNoDie($nodie = false)
    {
        $this->noDie = $nodie;
    }

}



/**
 * Instanciation à la volée et exécution.
 */
$options = getopt(
    vcrypt::OPTIONS['shortopt'],
    vcrypt::OPTIONS['longopt']
);

$commandName = basename($_SERVER['SCRIPT_NAME']);

$wrkdir = (@$_SERVER["PWD"]) ?: ".";

(new vcrypt($wrkdir, $options, $commandName))->__run();