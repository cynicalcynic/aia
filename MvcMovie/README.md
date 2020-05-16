# ASP.NET MVC

1. What  are  the  responsibilities  of  each  layer  of  the  MVC  architecture  and  how  are  they connected?

    ```
    Models - Represent data and interact with the database.
    Views - Handle data presentation.
    Controllers - Handles requests to the application.

    View displays the data passed from the controller. The controller handles the request flow and can pass the request payload to the model that will use them to i.e query a database and perform some data logic.
    ```

2. What  are  the  naming  conventions  for  models,  controllers,  controller  actions,  views  folders and views themselves?
    ```
    File names are always uppercase.
    View files are placed in their own directories, names of which correspond to the endpoint.
    Controller name -> *Controller.cs
    Names of controller's functions correspond to the view they are going to render.
    ```

3. How to pass data from controllers to views (2 options)?
    ```
    Either by passing it as an argument e.g return View(something) or by setting values of ViewData.
    ```

4. How to map url’s to controller actions?
    ```
    By configuring "pattern" option in UseEndpoints middleware.
    ```

5. How  to  restrict  controller  actions  to  be  executed  only  via  certain  HTTP  request  types  (e.g., only via POST)?
    ```
    By placing a [Http<Method>] attribute above a function in a controller.
    ```

6. How to make sure a controller action can only be called through a from our website and not through some external request?
    ```
    [ValidateAntiForgeryToken] attribute placed as explained above.
    ```

7. Where do you define data validation and how do you ensure it in views and controllers?
    ```
    In model classes by using special attributes. Then you can validate the model using IsValid property.
    ```

### What I've learned
I have learned the basics of ASP.NET MVC framework, I have never had any contact with it before.

### What probles I encountered
Visual Studio freezed and crashed (without displaying any sort of usefull error) every time I tried to create a new ASP project. (I swear half this IDE never works as intended). Ended up having to redownload and reinstall the whole 6GB ASP package (brilliant first impression of a technology I'm using for the first time ;) ).