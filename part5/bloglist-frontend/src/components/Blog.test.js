import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog";


test("rendering blog content", () => {
  const blog = {
    title:"new blog test",
    author: "fraz aslam",
    likes: 4,
    url: 'dfdfdfd@dfdfdf,com'
  }

  render (<Blog blog={blog.title} />)

  const element = screen.getByText("component testing is done with react-testing-library")
  expect(element).toBeDefined()
})

describe("Blog app", function() {
    it("front page can be openend", function() {
        cy.visit("http://localhost:3003")
        cy.contains("Blogs")
        cy.contains("Blog app")
    })
})