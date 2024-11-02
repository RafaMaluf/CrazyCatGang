Tem algumas coisas que tem que alterar no seu pc ai para funcionar.

Primeiro crie o banco de dados, só pegar o arquivo sql e rodar ele no workbench.
Depois disso, altere o "config.php" para os seus dados:
$servername = "localhost aqui"; 
$username = "aqui coloca seu usuario";
$password = "aqui coloca sua senha";
$dbname = "aqui coloca o nome do banco que criou "linoccg"";
$port = 3306; (a porta padrao é 3306, se vc nao mexeu deixa assim) 

A principio é isso, dai cria um usuario e vai testando.
