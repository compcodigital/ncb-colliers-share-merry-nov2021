export interface DrawData {
  entry_id: string;
  entry_action_type: string;
  last_major_draw_entry: string;
  major_draw_entries: [
    {
      id: string,
      name: string,
      code: string,
      entries: 0
    }
    ];
  prize_info: string;
  prize_info_name: string;

  error: string;
}
