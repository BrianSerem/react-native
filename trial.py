def check_if_feedback_was_left(chat):

    global feedback_left

    trade = chat["data"][ "messages"]

    for message in trade:

        if ("type", "feedback_received_admin") in message.items() and message ["text"] != " Itichy has left positive feedback.":
            feedback_left = True
        else:
            pass

    return feedback_left

def post_trade_chat(trade_hash, message):

    payload['trade_hash'] = trade_hash
    payload['message'] = message

    try:
        data_with_apiseal, headers =  prepare_request_body(payload)
        print(payload)
        resp = requests.post(post_trade_chat_url, data=data_with_apiseal, headers=headers)

    except ConnectionError:
        print("Network Error please check your internet connection")

    return resp

def get_all_completed_trades_hashes(pages):

    all_trades_hashes = []
    for page in pages:

        payload["page"] = page
        try:
            data_with_apiseal, headers = prepare_request_body(payload)
            resp = requests.post(
                completed_trades_url, data=data_with_apiseal, headers=headers
            )

        except ConnectionError:
            print("Network Error please check your internet connection")

        try:
            all_trades = resp.json()["data"]["trades"]

        except:
            print("error fetching all trades")

        else:
            for trade in all_trades:
                if trade["status"] == "successful":
                    all_trades_hashes.append(trade["trade_hash"])
