import { ComponentStory } from "@storybook/react";
import Home from "./Home";

export default {
    title: "Pages/Home_page",
    component: Home
}

const Template: ComponentStory<typeof Home> = (args) => <Home/>

export const HomePage = Template.bind({})
