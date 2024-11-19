package com.computerscience.views.contactus;

import com.computerscience.views.MainLayout;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@PageTitle("Contact Us")
@Route(value = "Contact-Us", layout = MainLayout.class)
@AnonymousAllowed
public class ContactUsView extends Composite<VerticalLayout> {

    public ContactUsView() {
        VerticalLayout content = getContent();
        content.setWidth("100%");
        content.setPadding(true);
        content.setSpacing(true);

        H1 title = new H1("Contact Us");
        content.add(title);

        Paragraph intro = new Paragraph("We'd Love to Hear From You! Whether you have questions about our events, want to collaborate, or are interested in becoming a member, the Computer Science Club at Mama Ngina University College is here to help. Feel free to reach out to us using the contact information below, and we'll get back to you as soon as possible.");
        content.add(intro);

        addSection("General Inquiries", new String[]{
            "Email: compscienceclub@mnu.ac.ke",
            "Phone: +254-xxx-xxx-xxx",
            "Office: Room 203, IT Department, Mama Ngina University College"
        });

        addSection("Membership Information", new String[]{
            "Membership Coordinator: James Maina",
            "Email: compscienceclub@mnu.ac.ke",
            "Phone: +254-xxx-xxx-xxx"
        });

        addSection("Collaboration and Partnerships", new String[]{
            "Partnerships Team Lead: Graham Bradshaw",
            "Email: compscienceclub@mnu.ac.ke",
            "Phone: +254-xxx-xxx-xxx"
        });

        addSection("Media and Press Inquiries", new String[]{
            "Media Relations Officer: Almalick Kweyu",
            "Email: compscienceclub@mnu.ac.ke",
            "Phone: +254-xxx-xxx-xxx"
        });

        addSection("Visit Us", new String[]{
            "Location: Mama Ngina University College, IT Department, Room 203",
            "Office Hours: Monday to Friday, 9:00 AM - 5:00 PM"
        });

        addSection("Follow Us", new String[]{
            "Facebook: facebook.com/MNUCSClub",
            "Twitter: @MNUCSClub",
            "LinkedIn: Mama Ngina University College CS Club",
            "Instagram: @MNUCSClub"
        });

        content.add(new H2("LEAVE US A MESSAGE"));
        content.add(createContactForm());
    }

    private void addSection(String title, String[] items) {
        H2 sectionTitle = new H2(title);
        getContent().add(sectionTitle);

        UnorderedList list = new UnorderedList();
        for (String item : items) {
            list.add(new ListItem(item));
        }
        getContent().add(list);
    }

    private FormLayout createContactForm() {
        FormLayout formLayout = new FormLayout();
        
        TextField name = new TextField("Name");
        EmailField email = new EmailField("Email");
        TextField subject = new TextField("Subject");
        TextArea message = new TextArea("Message");
        Button submit = new Button("Send Message");

        formLayout.add(name, email, subject, message, submit);

        submit.addClickListener(event -> {
            // Here you would typically handle the form submission
            // For now, we'll just clear the form
            name.clear();
            email.clear();
            subject.clear();
            message.clear();
        });

        return formLayout;
    }
}