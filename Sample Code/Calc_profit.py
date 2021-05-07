#Calculate the maximum profit that can be earned by a merchant such that weight limit is not exceeded.
def calc_profit(profit: list, weight: list, max_weight: int) -> int:
    """
    Function description is as follows-
    :param profit: Take a list of profits
    :param weight: Take a list of weight if bags corresponding to the profits
    :param max_weight: Maximum weight that could be carried
    :return: Maximum expected gain
    >>> calc_profit([1, 2, 3], [3, 4, 5], 15)
    6
    >>> calc_profit([10, 9 , 8], [3 ,4 , 5], 25)
    27
    """
    if len(profit) != len(weight):
        raise ValueError("The length of profit and weight must be same.")
    if max_weight <= 0:
        raise ValueError("max_weight must greater than zero.")
    if any(p < 0 for p in profit):
        raise ValueError("Profit can not be negative.")
    if any(w < 0 for w in weight):
        raise ValueError("Weight can not be negative.")

    # List created to store profit gained for the 1kg in case of each weight
    # respectively.  Calculate and append profit/weight for each element.
    profit_by_weight = [p / w for p, w in zip(profit, weight)]

    # Creating a copy of the list and sorting profit/weight in ascending order
    sorted_profit_by_weight = sorted(profit_by_weight)

    # declaring useful variables
    length = len(sorted_profit_by_weight)
    limit = 0
    gain = 0
    i = 0
    test = []

    # loop till the total weight do not reach max limit e.g. 15 kg and till i<length
    while limit <= max_weight and i < length:
        # flag value for encountered greatest element in sorted_profit_by_weight
        biggest_profit_by_weight = sorted_profit_by_weight[length - i - 1]
        """
        Calculate the index of the biggest_profit_by_weight in profit_by_weight list.
        This will give the index of the first encountered element which is same as of
        biggest_profit_by_weight.  There may be one or more values same as that of
        biggest_profit_by_weight but index always encounter the very first element
        only.  To curb this alter the values in profit_by_weight once they are used
        here it is done to -1 because neither profit nor weight can be in negative.
        """
        index = profit_by_weight.index(biggest_profit_by_weight)
        profit_by_weight[index] = -1

        # check if the weight encountered is less than the total weight
        # encountered before.
        if max_weight - limit >= weight[index]:
            limit += weight[index]
            # Adding profit gained for the given weight 1 ===
            # weight[index]/weight[index]
            gain += 1 * profit[index]
        else:
            # Since the weight encountered is greater than limit, therefore take the
            # required number of remaining kgs and calculate profit for it.
            # weight remaining / weight[index]
            gain += (max_weight - limit) / weight[index] * profit[index]
            break
        i += 1
    return gain

profit = [int(x) for x in "5 8 7 1 12 3 4".split()]
weight = [int(x) for x in "2 7 1 6 4 2 5".split()]
max_weight = 100

# Function Call
calc_profit(profit, weight, max_weight)

# source: https://github.com/TheAlgorithms/Python
