if (Meteor.isClient) {

  Template.sendEmailButton.events({
    'click button': function () {
        Meteor.call('sendEmail',
          'mike@example.com',
          'postmaster@middlelogic.com',
          'Hello from Meteor!',
          'This is a test of Email.send.'
        );
    }
  });
}

if (Meteor.isServer) {

  Meteor.methods({
    sendEmail: function (to, from, subject, text) {
      check([to, from, subject, text], [String]);

      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();

      Email.send({
        to: to,
        from: from,
        subject: subject,
        text: text
      });
    }
  });

}
