export interface Profile {
  is_admin: boolean;
  id: string;
  updated_at: string | undefined;
  username: string | undefined;
  full_name: string | undefined;
  avatar_url: string | undefined;
}
