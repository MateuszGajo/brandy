import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import Signin from "../Signin";

describe("test signin form", () => {
  afterAll(() => {
    cleanup();
  });

  it("invalid inputs, button should be disabled", async () => {
    const { getByTestId, container } = render(<Signin />);
    const emailInput = container.querySelector("input[name='email']");
    const passwordInput = container.querySelector("input[name='password']");
    const submitButton = getByTestId("signin-submit-button");
    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: "dfs" } });
    });

    await waitFor(() => {
      fireEvent.change(passwordInput, { target: { value: "fds" } });
    });

    expect(submitButton).toHaveClass("Mui-disabled");
  });

  it("all inputs are empty, button should be disabled", async () => {
    const { getByTestId, container } = render(<Signin />);
    const emailInput = container.querySelector("input[name='email']");
    const passwordInput = container.querySelector("input[name='password']");
    const submitButton = getByTestId("signin-submit-button");
    await waitFor(() => {
      fireEvent.change(emailInput, "");
    });
    await waitFor(() => {
      fireEvent.change(passwordInput, "");
    });
    expect(submitButton).toHaveClass("Mui-disabled");
  });

  it("valid inputs, button shouldn't be disabled", async () => {
    const { getByTestId, container } = render(<Signin />);
    const emailInput = container.querySelector("input[name='email']");
    const passwordInput = container.querySelector("input[name='password']");
    const submitButton = getByTestId("signin-submit-button");
    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: "fdsa@ss.pl" } });
    });
    await waitFor(() => {
      fireEvent.change(passwordInput, { target: { value: "fdfdsfsdfsds" } });
    });

    expect(submitButton.classList.contains("Mui-disabled")).toBe(false);
  });
});
