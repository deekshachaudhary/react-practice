// Form only using HTML
const HTMLForm = () => {
  return (
    <form 
      action="https://www.greatfrontend.com/api/questions/contact-form" 
      method="post" 
    > 
      <div> 
        <label for="name">Name</label> 
        <input type="text" name="name" placeholder="Name" /> 
      </div> 
      <div> 
        <label for="email">Email</label> 
        <input type="email" name="email" placeholder="Email" /> 
      </div> 
      <div> 
        <label for="message">Message</label> 
        <textarea name="message" placeholder="Type your message"></textarea> 
      </div> 
      <input type="submit" /> 
    </form> 
  );
}

export default HTMLForm;