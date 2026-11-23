import { contactPeople as copy, contacts, whatsappLink } from "@/lib/content";

/** "Talk to us directly": one card per director with email, tap-to-call and a WhatsApp button. Dark sections only. */
export default function DirectContacts() {
  return (
    <div className="mt-10">
      <span className="text-[10px] font-bold uppercase tracking-[.2em] text-white/40">{copy.heading}</span>
      <ul className="mt-5 grid gap-4">
        {contacts.map((person) => (
          <li key={person.tel} className="rounded-[1.5rem] border border-white/15 p-6">
            <p className="text-lg font-semibold text-white">{person.name}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[.2em] text-coral-soft">{person.role}</p>
            <a
              href={`mailto:${person.email}`}
              aria-label={`${copy.emailLabel} ${person.name}`}
              className="mt-3 inline-flex min-h-11 items-center text-sm text-white/55 transition-colors hover:text-white"
            >
              {person.email}
            </a>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={`tel:${person.tel}`}
                aria-label={`${copy.callLabel} ${person.name}`}
                className="inline-flex min-h-11 items-center text-sm text-white/55 transition-colors hover:text-white"
              >
                {person.phone}
              </a>
              <a
                href={whatsappLink(person)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.whatsappLabel} ${person.name}`}
                className="btn-outline min-h-11 px-5 py-3"
              >
                {copy.whatsapp}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
