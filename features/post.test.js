describe('Logged In ', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:5000/');
    await page.evaluate(() => {
      localStorage.setItem("username","User");
      });
    await page.goto('http://localhost:5000/feed');
  });


  describe('adding a post', () => {
    it("asks users for a post", async () => {
      await expect(page).toMatch("What's on your mind?");
    });
    it('users can add posts ', async () => {
      await expect(page).toFillForm('form[name="addPost"]', {
        content: 'My first post'
      });

      await page.click('#submit');
      await expect(page).toMatch('My first post')
    });
  });

  describe('adding a comment', () => {

    beforeAll(async () => {
      await expect(page).toFillForm('form[name="addPost"]', {
        content: 'My first post'
      });
      await page.click('#submit');
    })

    it("should have a comment option", async () => {
      await expect(page).toMatch('Comment')

    });

    it("should have a comment option", async () => {
      await expect(page).toFillForm('form[name="addComment"]', {
        comment: 'Long comment'
      });
      await page.click('.comment');
      await expect(page).toMatch('Long comment')
    });
  });

  it("can handle special characters", async () => {
    await page.type("#postContent", "punctuation's $?%@!\"");
    await page.click('#submit');
    await expect(page).toMatch("punctuation's $?%@!\"")
  });

  it("can handle new lines", async () => {
    await page.type("#postContent", "first line");
    await page.keyboard.press('Enter');
    await page.type("#postContent", "second line");
    await page.click('#submit');
    await expect(page).not.toMatch("first line second line");
    });

 it("clears textbox on submit", async () => {
    await page.type("#postContent", "this will be cleared");
    await page.click("#submit");

    var text = await page.evaluate(() => {
        return document.getElementById("postContent").value
    })
    console.log(text);

    await expect(text).toEqual("");
})

  it("displays the time it was created", async () => {
    let now = await Date(Date.now()).toString().substring(1, 15);
    await expect(page).toMatch(now);
  });
});
//
