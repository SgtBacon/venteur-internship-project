### Tech Choices

    I chose to use ESLint and Prettier to make my work more cohesive. I have used both extensions in the past and will continue to do so as I feel it is extremely helpful to have some extra help in handling syntax and stylistic integrity. This help becomes more and more important as a team gets larger and larger, due to every dev having their own styling and syntax preferences. While many of these issues can be caught in a Pull Request, why let it get to that point, when we have the technology to solve that before it becomes a problem. Prettier also means that I don't have to format by hand a complicated component tree, and I won't complain about that.

### Code Choices

    1. Axios: I have more experience using a custom middleware to handle API calls with Redux hooks, but since I did not implement our custom middleware in my last position, I did not feel comfortable enough in implementing my own with a looming deadline. So instead I decided to go with Axios, as I feel Axios offers more benefits, such as better browser support, the simplification of the HTML request process, and in my opinion, Axios requests are more human-readable, an important property that can be lost when making these choices. Although in the long-run, a custom middleware would be a better choice for the customization aspect, depending on what specific applications are needed. I did encounter an issue with POST requests, where it would stringify everything I was sending in a request body, it was solved eventually but that is just another reason why I would switch to a custom middleware.

    2. Custom components: While I have implemented custom Material-Ui components and feel they are easy to implement and can provide as-needed functionality, I made the choice to not implement any major custom components. I am trying to avoid getting tied down with styling due to the time limit, but I do think that custom components would be great in a few spots, such as a custom Accordion for displaying the list of Counties that are associated with a Zip Code, or a background for the page.

    3. Components: I wanted to use Material-Ui's ToggleButtonGroup/ToggleButton components for Users to select from enums Smoker, Gender, and Term, but I couldn't get it to import. There's an issue there somewhere but I felt it was less important to fix that at the time. Instead I chose to use Material-Ui's Switch for the Smoker and Gender, which added unnecessary code, and did not look as good as I would like.

### Issues

    1. Material-Ui updated their name to Mui midway through development, including all of their files, and while trying to update everything I came across a few import errors, but I didn't want to spend too much time tracking down and working through these issues. Data display became difficult due to the data grid component not having an updated dependency, thus changing my entire idea of data display to a basic table.

### What Would I Change?

    1. Stylistically: The page is a nightmare. Lack of cohesion between UI elements, spacing is just not where it should be, and components need some stylistic customization to make them better fit the style guidelines/wireframe the page would have. A better display for all the pieces of data would be great, the Accordions are fun, but they need lots of work to make them look like an element should.

    2. Accessibility: I don't think this would pass any guidelines for any disability. Focus changes don't seem to work appropriately, needs testing for screen-readers/writers, etc.

    3. Security: Technically this project doesn't have a large need for security policies, but in the real-world, a similar application would need excessively tight security to prevent important data from being breached, and the project should be built with that in mind, and this is not.

    4. Refactoring: This project is, in my opinion, a good start. But it is incredibly far from being production-ready. One thing that is extremely important is refactoring code for the future. Right now, if the scope of the project were to expand, the project would have to be rebuilt almost entirely to allow for more flexible use. If I had more time, refactoring would be my number one priority.
