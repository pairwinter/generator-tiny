#This generator is only used by myself, and the function is very poor, please do not install!   
#What is it?    
A generator of Yo and a tool that based on NodeJS      
To create the apps and the view templates with the user input arguments. save the time for developer to develop new feature.        
The details information about generator please reference the website [Yeoman](http://yeoman.io).        
#How does it work?    
In the environment of NodeJS, Yeoman, execute the shell command to build files.     
views,tmpl  
#Install
##It's a module of NodeJS, so you can execute the command to get it.  
    npm install tiny-generator
##and the constructor of tiny-generator contents two parts:
*   **tiny:app** the base of generator, but it does not do anythings.
*   **tiny:backbone** the primary function that we use in development.  

#Usage
##1, post one parameter when execute `tiny:backbone`
    tiny:backbone appModuleName
the appModuleName is name of the module that you created, it can be a path like this `folderParent/folderSub/modelName`   
###eg.      
    tiny:backbone settings/contact/profile (you don't need to add the suffix of the file)
it will generate two files in the path of the root path(you should config the root path)

*   rootPath/settings/contact/profileApp.js
*   rootPath/tmpl/settings/contact/profileAppTmpl.html  

##2, set the resources path where you place the generated javascript and html files
The resources path that you place javascript and template file: the default value is the path of command executed.
##3, select the type of code that you want to use   
*   standard
*   dialog
*   grid
*   dialog-grid

##4, do you want to add form validation code?

##5, The root path that you place the files that for your testing.
we will generate 3 files for testing
1, testingRootPath/app/settings/contact/profileAppTest.html, if you use the grunt serve to open this file, this file will show the usage of the new created app.
2, testingRootPath/test/settings/contact/profileApp-unitTest.js
3, testingRootPath/test/settings/contact/profileApp-endToEndTest.js 

##6, delete the files that you just created with the option --delete
`tiny:backbone appModuleName --delete`, this will delete the files that you created.  
##7, Only generate testing files for existed files.
`tiny:backbone appModuleName --testonly`, this will generate the testing files for the existed module apps.
#maintainability
Add the generator templates by the requirements of Project.


## Release History

2015-2-22       v0.2.7     add the testonly option to create the testing files for the existed apps.
2015-2-5       v0.2.4      add the delete option to delete the files that created.

    
    
    
    
