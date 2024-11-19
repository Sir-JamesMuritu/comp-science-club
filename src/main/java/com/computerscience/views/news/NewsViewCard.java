package com.computerscience.views.news;

import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.ListItem;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.theme.lumo.LumoUtility.*;

public class NewsViewCard extends ListItem {

    private Dialog dialog; // Removed final and initializing within the constructor

    public NewsViewCard(String title, String url, String date, String shortText, String fullText) {
        addClassNames(Background.CONTRAST_5, Display.FLEX, FlexDirection.COLUMN, AlignItems.START, Padding.MEDIUM, BorderRadius.LARGE, Display.FLEX, FlexDirection.COLUMN, AlignItems.START, Padding.MEDIUM, BorderRadius.LARGE);

        // Image preview
        Div imageContainer = new Div();
        imageContainer.addClassNames(Width.FULL, Height.AUTO, BorderRadius.MEDIUM, Overflow.HIDDEN, Margin.Bottom.MEDIUM);
        Image image = new Image(url, title);
        image.setWidth("100%");
        imageContainer.add(image);

        // Header and subtitle
        Span header = new Span(title);
        header.addClassNames(FontSize.XLARGE, FontWeight.SEMIBOLD);

        Span subtitle = new Span("Date: " + date);
        subtitle.addClassNames(FontSize.SMALL, TextColor.SECONDARY);

        // Short description
        Paragraph description = new Paragraph(shortText);
        description.addClassNames(FontSize.SMALL, Margin.Vertical.MEDIUM, TextColor.SECONDARY);

        // Initialize dialog in the constructor with 60% size
        dialog = createPopupDialog(title, url, date, fullText);

        // Add click listener to toggle dialog visibility
        addClickListener(event -> {
            if (dialog.isOpened()) {
                dialog.close();
            } else {
                dialog.open();
            }
        });

        // Add components to card layout
        add(imageContainer, header, subtitle, description);
    }

    private Dialog createPopupDialog(String title, String url, String date, String fullText) {
        Dialog dialog = new Dialog();
        dialog.setModal(true);
        dialog.setDraggable(false);
        dialog.setResizable(false);

        // Set dialog dimensions to 60% of the screen
        dialog.setWidth("60%");
        dialog.setHeight("100%");
        dialog.addClassNames("popup-dialog");

        // Full content layout in dialog
        Div dialogContent = new Div();
        dialogContent.addClassNames(Display.FLEX, FlexDirection.COLUMN, Padding.LARGE);

        // Image
        Image dialogImage = new Image(url, title);
        dialogImage.setWidth("60%");

        // Header, subtitle, and full description
        Span dialogHeader = new Span(title);
        dialogHeader.addClassNames(FontSize.XXLARGE, FontWeight.BOLD, Margin.Bottom.SMALL);

        Span dialogSubtitle = new Span("Date: " + date);
        dialogSubtitle.addClassNames(FontSize.MEDIUM, TextColor.SECONDARY, Margin.Bottom.MEDIUM);

        Paragraph dialogDescription = new Paragraph(fullText);
        dialogDescription.addClassNames(FontSize.MEDIUM, TextColor.BODY);

        // Add all components to dialog content
        dialogContent.add(dialogImage, dialogHeader, dialogSubtitle, dialogDescription);

        // Add dialog content to dialog
        dialog.add(dialogContent);

        return dialog;
    }
}
