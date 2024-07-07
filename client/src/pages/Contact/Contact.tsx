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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import styles from "./Contact.module.css";
import BackgroundSVG from "../../ui/BackgroundSVG/BackgroundSVG";
import { IFormData, postContactRequest } from "./contactServices";
import { useMutation } from "react-query";

export default function ContactForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const { mutate } = useMutation({
    mutationKey: ["postContactRequest"],
    mutationFn: () => postContactRequest(formData),
    onSuccess: async () => {
      await Swal.fire({
        title: "Your contact request has been submitted",
        icon: "success",
      });
      navigate("/");
    },
    onError: async () => {
      await Swal.fire({
        title: "Unable to submit your contact request, try again later",
        icon: "error",
      });
    },
  });

  function handleChange(
    _e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    data: InputOnChangeData | TextAreaProps
  ): void {
    const { name, value } = data;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    mutate();
  }

  // useEffect(() => {
  //   async function postData() {
  //     try {
  //       const response = await postContactRequest(formData);

  //       console.log(response);

  //       await Swal.fire({
  //         title: "Your contact request has been submitted",
  //         icon: "success",
  //       });
  //       navigate("/");
  //     } catch (error) {
  //       console.error("There was a problem with the fetch operation:", error);
  //     }
  //   }

  //   postData();
  // }, [formData, navigate]);

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
