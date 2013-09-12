@ECHO OFF
rem set self_file=%~f0
rem set self_path=%~dp0
rem echo SET /P var_path= > use-setpath.cmd
rem echo set path=%path%%%var_path%% >> use-setpath.cmd
rem echo start >> use-setpath.cmd
rem echo wmic ENVIRONMENT where "name='path' and username='<system>'" set VariableValue="%%path%%%%var_path%%" >> use-setpath.cmd
rem cscript %~dp0\use.jse //Nologo //E:JScript %* | use-setpath.cmd
cscript %~dp0\use.jse //Nologo //E:JScript %* 