CREATE TABLE public.property_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  floor text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT property_enquiries_name_length CHECK (char_length(name) BETWEEN 2 AND 100),
  CONSTRAINT property_enquiries_email_length CHECK (char_length(email) BETWEEN 5 AND 255),
  CONSTRAINT property_enquiries_phone_length CHECK (char_length(phone) BETWEEN 7 AND 20),
  CONSTRAINT property_enquiries_floor_allowed CHECK (floor IN ('1st Floor — INR 1.00 Cr', '2nd Floor — INR 1.15 Cr', '3rd Floor — INR 1.25 Cr', 'No preference yet'))
);

GRANT INSERT ON public.property_enquiries TO anon;
GRANT INSERT ON public.property_enquiries TO authenticated;
GRANT ALL ON public.property_enquiries TO service_role;

ALTER TABLE public.property_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a property enquiry"
ON public.property_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 2 AND 100
  AND char_length(email) BETWEEN 5 AND 255
  AND char_length(phone) BETWEEN 7 AND 20
  AND floor IN ('1st Floor — INR 1.00 Cr', '2nd Floor — INR 1.15 Cr', '3rd Floor — INR 1.25 Cr', 'No preference yet')
);