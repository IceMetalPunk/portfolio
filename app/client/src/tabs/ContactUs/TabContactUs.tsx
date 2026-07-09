import { useCallback, useState, type SubmitEvent, type InputEvent } from 'react';
import './TabContactUs.css';
import classNames from 'classnames';
import { Link } from 'react-router';

interface FeedbackForm {
  body: string,
  subject: string,
  name: string,
  reply_to: string
};
export const TabContactUs = () => {
  const [formData, setFormData] = useState<FeedbackForm>({
    body: '',
    subject: 'Job Opportunity',
    name: '',
    reply_to: ''
  });
  const [feedbackMessage, setFeedbackMessage] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const updateField = useCallback((ev: InputEvent) => {
    if (!ev.target) {
      return;
    }
    const targetElement: HTMLInputElement = ev.target as HTMLInputElement;
    setFormData((existing: FeedbackForm) => {
      return {
        ...existing,
        [targetElement.name]: targetElement.value
      };
    });
  }, [setFormData]);

  const sendEmail = useCallback(async (ev: SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data: FormData = new FormData();
    for (let [key, value] of Object.entries(formData)) {
      data.append(key, value);
    }
    setIsSending(true);
    const res: Response = await fetch('/api/sendContact', {
      method: 'POST',
      body: data
    });
    const json: Record<string, string> = await res.json();
    setIsError(!json.success);
    if (json.error) {
      setFeedbackMessage(json.error);
    } else {
      setFeedbackMessage('Message sent!');
      setFormData((existing: FeedbackForm) => {
        return { ...existing, body: '', subject: 'Job Opportunity' };
      });
    }
    setIsSending(false);
    return false;
  }, [formData, setFeedbackMessage, setIsError, setFormData, setIsSending]);

  return (
    <>
      I'd love to hear from you, especially if you're a prospective employer!<br />
      Please fill out the form below, or you can also contact me at <Link to='mailto:KShaneBurns@byexpression.dev'>KShaneBurns@byexpression.dev</Link>.
      <section>
        {feedbackMessage && <span className={classNames({
          feedback: true,
          error: isError
        })}>{feedbackMessage}</span>}
        <form onSubmit={sendEmail}>
          <label>
            <fieldset>
              <legend>Your Name</legend>
              <input disabled={isSending} type="text" name="name" value={formData.name} onInput={updateField} />
            </fieldset>
          </label>
          <label>
            <fieldset>
              <legend>Your Email</legend>
              <input disabled={isSending} type="text" name="reply_to" value={formData.reply_to} onInput={updateField} />
            </fieldset>
          </label>
          <label>
            <fieldset>
              <legend>Subject</legend>
              <select disabled={isSending} name="subject" value={formData.subject} onInput={updateField}>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="General Feedback">General Feedback</option>
                <option value="Bug Report">Bug Report For Portfolio</option>
                <option value="Other">Other</option>
              </select>
            </fieldset>
          </label>
          <label className="full-width-row">
            <fieldset>
              <legend>Message</legend>
              <textarea disabled={isSending} name="body" value={formData.body} onInput={updateField} rows={5} />
            </fieldset>
          </label>
          <div className="full-width-row">
            <input disabled={isSending} type='submit' value='Send' />
          </div>
        </form>
      </section >
    </>
  );
};
