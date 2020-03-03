Task 1-B

Accessability is an important feature of all public facing websites.

Note: In some place where we don't have mat-label tag, I added the arial-label class.

The matInput directive works with native <input> to provide an accessible experience.
If the containing <mat-form-field> has a label it will automatically be used as the aria-label for the <input>. However, if there's no label specified in the form field, aria-label, aria-labelledby or <label for=...> should be added.
Any mat-error and mat-hint are automatically added to the input's aria-describedby list, and aria-invalid is automatically updated based on the input's validity state.


