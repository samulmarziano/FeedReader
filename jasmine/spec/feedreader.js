/*
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 *
 * All of the tests are placed within the $() function (document ready),
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test suite for the feeds themselves */
    describe('RSS Feeds', function() {

        // Make sure the allFeeds object is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Loops through URLs to be sure they're defined and have values
         it('urls are defined and not empty', function() {
           allFeeds.forEach(function(feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
           });
         });

         // Loops through the names to be sure they're defined and have values
         it('have a name', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });


    /* Test suite for the menu feature" */
    describe('The Menu', function() {

      // Suite global variables
      const docBody = document.body;
      const menu = document.querySelector('.menu-icon-link');

        // Check that menu is hidden by default
       it('is hidden by default', function() {
         expect(docBody.className).toContain('menu-hidden');
       });

        // Check that menu is visible when clicked
        it('is visible when menu icon is clicked', function() {
          menu.click();
          expect(docBody.className).not.toContain('menu-hidden');

          menu.click();
          expect(docBody.className).toContain('menu-hidden');
        });
    });

    /* Test suite to check for initial entries */
    describe('Initial Entries', function() {
       // This avoids duplicated setup
       beforeEach(function(callBack) {
         loadFeed(0, function() {
           callBack();
         });
       });

       // Check for at least one entry
       it('loadFeed function called with at least one entry', function(callBack) {
         const entryCount = document.querySelector('.feed').getElementsByClassName('entry').length;
         expect(entryCount).toBeGreaterThan(0);
         callBack();
       });
    });

    /* Test suite to ensure that feeds are loaded and the content changes */
    describe('New Feed Selection', function() {
      // Test suite global variable
       let initialFeed = '';

       /*
       * This avoids duplicated setup
       * and stores the initial feed HTML for comparison
       */
       beforeEach(function(callBack) {
         loadFeed(0, function() {
           initialFeed = document.querySelector('.feed').innerHTML;

           loadFeed(1, function() {
             callBack();
           });
         });
       });

       // Compares initial feed to new feed to ensure it changed
       it('changes content when new feed is loaded', function(callBack) {
         const newFeed = document.querySelector('.feed').innerHTML;
         expect(initialFeed).not.toBe(newFeed);

         callBack();
       });
    });
}());
