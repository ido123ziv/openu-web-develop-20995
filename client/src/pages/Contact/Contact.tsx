import { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  Form,
  Input,
  TextArea,
  Header,
  Icon,
  InputOnChangeData,
  TextAreaProps,
} from "semantic-ui-react";

import styles from "./Contact.module.css";
import BackgroundSVG from "../../ui/BackgroundSVG/BackgroundSVG";

interface IFormData {
  name: string;
  email: string;
  title: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  function handleChange(
    _e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    data: InputOnChangeData | TextAreaProps
  ): void {
    const { name, value } = data;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    console.log(formData);
    alert("Message submitted!");
    window.location.reload();
  }

  return (
    <>
      <BackgroundSVG />

      <div className={styles.formContainer}>
        <Header as="h2" icon textAlign="center">
          <Icon name="mail outline" circular />
          <Header.Content>Contact</Header.Content>
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <Input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Title</label>
            <Input
              name="title"
              placeholder="Title of your message"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Message</label>
            <TextArea
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <div className={styles.centerButton}>
            <Button type="submit" primary>
              Send Message
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
